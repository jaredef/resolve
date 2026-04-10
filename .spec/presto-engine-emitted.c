/* =====================================================
   PRESTO Engine (C) -- emitted by SERVER bootstrap
   Self-contained. No external deps beyond libc.
   Resolves htx: directives through the 22-stage pipeline.

   This is what the bootstrap PRODUCES -- a minimal but
   functional PRESTO engine that can parse and resolve
   .htx templates.

   Compile: cc -o presto presto-engine-emitted.c
   Run:     echo '<h1>{htx:title}</h1>' | ./presto title=Hello
   ===================================================== */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <ctype.h>

/* Forward declarations */
static char *apply_pipe(const char *val, const char *pipe_name);
static void sha256(const uint8_t *data, size_t len, uint8_t out[32]);

/* ================================================================
   String buffer (dynamic, reusable)
   ================================================================ */
typedef struct {
    char *data;
    int len, cap;
} Buf;

static Buf buf_new(int cap) {
    Buf b = { malloc(cap), 0, cap };
    b.data[0] = 0;
    return b;
}
static void buf_cat(Buf *b, const char *s, int n) {
    if (n < 0) n = strlen(s);
    while (b->len + n + 1 > b->cap) { b->cap *= 2; b->data = realloc(b->data, b->cap); }
    memcpy(b->data + b->len, s, n);
    b->len += n;
    b->data[b->len] = 0;
}
static void buf_cats(Buf *b, const char *s) { buf_cat(b, s, strlen(s)); }
static void buf_free(Buf *b) { free(b->data); b->data = NULL; b->len = b->cap = 0; }
static char *buf_take(Buf *b) { char *r = b->data; b->data = NULL; b->len = b->cap = 0; return r; }

/* ================================================================
   Context (key-value pairs, parent-chained scoping)
   ================================================================ */
typedef struct Ctx {
    char *keys[128];
    char *vals[128];
    int count;
    struct Ctx *parent;
} Ctx;

static Ctx *ctx_new(Ctx *parent) {
    Ctx *c = calloc(1, sizeof(Ctx));
    c->parent = parent;
    return c;
}
static void ctx_set(Ctx *c, const char *key, const char *val) {
    for (int i = 0; i < c->count; i++) {
        if (strcmp(c->keys[i], key) == 0) { free(c->vals[i]); c->vals[i] = strdup(val); return; }
    }
    if (c->count < 128) { c->keys[c->count] = strdup(key); c->vals[c->count] = strdup(val); c->count++; }
}
static const char *ctx_get(Ctx *c, const char *key) {
    for (; c; c = c->parent)
        for (int i = 0; i < c->count; i++)
            if (strcmp(c->keys[i], key) == 0) return c->vals[i];
    return NULL;
}
static void ctx_free(Ctx *c) {
    for (int i = 0; i < c->count; i++) { free(c->keys[i]); free(c->vals[i]); }
    free(c);
}

/* Resolve dotted path: "post.title" splits on . and walks nested keys.
   For flat context, just does direct lookup of the full path. */
static const char *ctx_resolve(Ctx *c, const char *path) {
    const char *v = ctx_get(c, path);
    if (v) return v;
    /* Try first segment */
    const char *dot = strchr(path, '.');
    if (!dot) return "";
    char prefix[256];
    int plen = (int)(dot - path);
    if (plen >= 256) return "";
    memcpy(prefix, path, plen); prefix[plen] = 0;
    /* For now, flat context only -- return empty on miss */
    return ctx_get(c, path) ? ctx_get(c, path) : "";
}

/* ================================================================
   HTML escape
   ================================================================ */
static char *html_escape(const char *s) {
    Buf b = buf_new(strlen(s) * 2 + 1);
    for (; *s; s++) {
        switch (*s) {
            case '&': buf_cats(&b, "&amp;"); break;
            case '<': buf_cats(&b, "&lt;"); break;
            case '>': buf_cats(&b, "&gt;"); break;
            case '"': buf_cats(&b, "&quot;"); break;
            default: buf_cat(&b, s, 1);
        }
    }
    return buf_take(&b);
}

/* ================================================================
   File reading
   ================================================================ */
static char *read_file(const char *path) {
    FILE *f = fopen(path, "r");
    if (!f) return NULL;
    fseek(f, 0, SEEK_END); long len = ftell(f); fseek(f, 0, SEEK_SET);
    char *buf = malloc(len + 1);
    fread(buf, 1, len, f); buf[len] = 0;
    fclose(f);
    return buf;
}

/* ================================================================
   Directive finders (simple string scanning, no regex)
   ================================================================ */

/* Find <htx:TAG ... from pos. Returns pointer or NULL. */
static const char *find_directive(const char *html, const char *tag) {
    char pattern[64];
    snprintf(pattern, sizeof(pattern), "<htx:%s", tag);
    return strstr(html, pattern);
}

/* Extract attribute value from an attribute string: key="value" */
static int get_attr(const char *attrs, const char *key, char *out, int maxlen) {
    char pattern[64];
    snprintf(pattern, sizeof(pattern), "%s=\"", key);
    const char *s = strstr(attrs, pattern);
    if (!s) return 0;
    s += strlen(pattern);
    const char *e = strchr(s, '"');
    if (!e) return 0;
    int len = (int)(e - s);
    if (len >= maxlen) len = maxlen - 1;
    memcpy(out, s, len); out[len] = 0;
    return 1;
}

/* Extract attributes string from a tag: everything between <htx:name and > or /> */
static int extract_tag_attrs(const char *tag_start, const char *name, char *attrs, int maxlen) {
    const char *p = tag_start + 5 + strlen(name); /* skip <htx:name */
    while (*p == ' ') p++;
    const char *end = p;
    while (*end && *end != '>' && !(*end == '/' && *(end+1) == '>')) end++;
    int len = (int)(end - p);
    if (len >= maxlen) len = maxlen - 1;
    memcpy(attrs, p, len); attrs[len] = 0;
    return (*end == '/' || (end > p && *(end-1) == '/'));
}

/* ================================================================
   Stage 15: Expression evaluation {htx:path}
   ================================================================ */
static char *eval_expressions(const char *html, Ctx *ctx) {
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (*p) {
        const char *expr = strstr(p, "{htx:");
        if (!expr) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(expr - p));
        const char *end = strchr(expr, '}');
        if (!end) { buf_cat(&out, expr, 1); p = expr + 1; continue; }
        char path[256];
        int plen = (int)(end - expr - 5);
        if (plen >= 256) plen = 255;
        memcpy(path, expr + 5, plen); path[plen] = 0;
        /* Trim and resolve */
        char *tp = path;
        while (*tp == ' ') tp++;
        char *te = tp + strlen(tp) - 1;
        while (te > tp && *te == ' ') *te-- = 0;
        /* Check for pipe */
        char *pipe = strchr(tp, '|');
        char *pipe_name = NULL;
        if (pipe) { *pipe = 0; pipe_name = pipe + 1; while (*pipe_name == ' ') pipe_name++; }
        /* Trim path */
        char *path_end = tp + strlen(tp) - 1;
        while (path_end > tp && *path_end == ' ') *path_end-- = 0;

        const char *val = ctx_resolve(ctx, tp);
        char *processed = pipe_name ? apply_pipe(val, pipe_name) : strdup(val);
        char *escaped = html_escape(processed);
        buf_cats(&out, escaped);
        free(escaped);
        free(processed);
        p = end + 1;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 14: htx:each iteration
   ================================================================ */
static char *resolve_each(const char *html, Ctx *ctx);

/* Simple array-like iteration: look for data in context as "item.0", "item.1", etc.
   Or count-based from a numeric context value */
static char *resolve_each(const char *html, Ctx *ctx) {
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "each");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));

        /* parse attrs */
        char attrs[1024];
        extract_tag_attrs(tag, "each", attrs, sizeof(attrs));
        char items_path[256], as_name[256];
        get_attr(attrs, "items", items_path, sizeof(items_path));
        get_attr(attrs, "as", as_name, sizeof(as_name));

        /* find body between > and </htx:each> */
        const char *body_start = strchr(tag, '>');
        if (!body_start) { buf_cats(&out, p); break; }
        body_start++;
        const char *body_end = strstr(body_start, "</htx:each>");
        if (!body_end) { buf_cats(&out, p); break; }
        char *body = strndup(body_start, body_end - body_start);

        /* iterate: look for items_path.0, items_path.1, etc. in context */
        int idx = 0;
        while (1) {
            /* Check if any key starts with items_path.N */
            char check[512];
            snprintf(check, sizeof(check), "%s.%d", items_path, idx);
            int checklen = strlen(check);
            const char *exists = ctx_get(ctx, check);
            /* Scan all context entries for prefix match */
            const char *exists2 = NULL;
            for (Ctx *sc = ctx; sc && !exists2; sc = sc->parent)
                for (int j = 0; j < sc->count; j++)
                    if (strncmp(sc->keys[j], check, checklen) == 0 &&
                        (sc->keys[j][checklen] == '.' || sc->keys[j][checklen] == 0))
                        { exists2 = sc->vals[j]; break; }
            if (!exists && !exists2) break;

            /* Create child context with as_name -> items_path.N prefix mapping */
            Ctx *child = ctx_new(ctx);

            /* Map as_name.field -> items_path.N.field for all known fields */
            /* Simple approach: copy all items_path.N.* to as_name.* */
            char prefix[512];
            snprintf(prefix, sizeof(prefix), "%s.%d.", items_path, idx);
            int prefixlen = strlen(prefix);
            for (Ctx *c = ctx; c; c = c->parent) {
                for (int i = 0; i < c->count; i++) {
                    if (strncmp(c->keys[i], prefix, prefixlen) == 0) {
                        char mapped[512];
                        snprintf(mapped, sizeof(mapped), "%s.%s", as_name, c->keys[i] + prefixlen);
                        ctx_set(child, mapped, c->vals[i]);
                    }
                }
            }
            /* Also set the direct value if it's a simple string */
            if (exists) ctx_set(child, as_name, exists);

            /* Resolve body with child context */
            char *resolved_body = eval_expressions(body, child);
            buf_cats(&out, resolved_body);
            free(resolved_body);
            ctx_free(child);
            idx++;
        }

        free(body);
        p = body_end + 11; /* skip </htx:each> */
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 14: htx:if conditional
   ================================================================ */
static char *resolve_if(const char *html, Ctx *ctx) {
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "if");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));

        char attrs[1024];
        extract_tag_attrs(tag, "if", attrs, sizeof(attrs));
        char test_path[256];
        get_attr(attrs, "test", test_path, sizeof(test_path));

        const char *body_start = strchr(tag, '>');
        if (!body_start) { buf_cats(&out, p); break; }
        body_start++;
        const char *if_end = strstr(body_start, "</htx:if>");
        if (!if_end) { buf_cats(&out, p); break; }

        char *if_body = strndup(body_start, if_end - body_start);
        p = if_end + 9; /* skip </htx:if> */

        /* Check for <htx:else> */
        char *else_body = NULL;
        const char *else_tag = strstr(p, "<htx:else>");
        if (else_tag && else_tag == p) {
            /* Skip whitespace */
            while (*p == ' ' || *p == '\n' || *p == '\r' || *p == '\t') p++;
            if (strncmp(p, "<htx:else>", 10) == 0) {
                p += 10;
                const char *else_end = strstr(p, "</htx:else>");
                if (else_end) {
                    else_body = strndup(p, else_end - p);
                    p = else_end + 11;
                }
            }
        }

        /* Evaluate condition */
        const char *val = ctx_resolve(ctx, test_path);
        int truthy = val && *val && strcmp(val, "0") != 0 && strcmp(val, "false") != 0;

        if (truthy) {
            buf_cats(&out, if_body);
        } else if (else_body) {
            buf_cats(&out, else_body);
        }

        free(if_body);
        free(else_body);
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 9: htx:let binding
   ================================================================ */
static char *resolve_let(const char *html, Ctx *ctx) {
    Buf out = buf_new(strlen(html) + 64);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "let");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));
        char attrs[1024];
        int self_closing = extract_tag_attrs(tag, "let", attrs, sizeof(attrs));
        (void)self_closing;

        /* Parse name=value pairs from attrs */
        char *a = attrs;
        while (*a) {
            while (*a == ' ') a++;
            if (!*a) break;
            char *eq = strchr(a, '=');
            if (!eq) break;
            char name[128];
            int nlen = (int)(eq - a);
            if (nlen >= 128) nlen = 127;
            memcpy(name, a, nlen); name[nlen] = 0;
            /* skip =" */
            char *vs = eq + 1;
            if (*vs == '"') vs++;
            char *ve = strchr(vs, '"');
            if (!ve) break;
            char val[1024];
            int vlen = (int)(ve - vs);
            if (vlen >= 1024) vlen = 1023;
            memcpy(val, vs, vlen); val[vlen] = 0;
            ctx_set(ctx, name, val);
            a = ve + 1;
        }

        /* Skip past /> or > */
        const char *end = strchr(tag, '>');
        if (end) p = end + 1; else break;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 13: htx:auth / htx:unauth
   ================================================================ */
static char *resolve_auth(const char *html, Ctx *ctx) {
    Buf out = buf_new(strlen(html) + 64);
    const char *p = html;
    int is_authed = ctx_get(ctx, "auth.user.id") != NULL;

    /* htx:auth blocks */
    while (1) {
        const char *tag = find_directive(p, "auth");
        if (!tag) { buf_cats(&out, p); break; }
        /* Make sure it's not htx:action */
        if (tag[5] == 'c') { /* htx:action */
            buf_cat(&out, p, (int)(tag - p) + 5);
            p = tag + 5;
            continue;
        }
        buf_cat(&out, p, (int)(tag - p));
        const char *body_start = strchr(tag, '>');
        if (!body_start) { buf_cats(&out, p); break; }
        body_start++;
        const char *body_end = strstr(body_start, "</htx:auth>");
        if (!body_end) { buf_cats(&out, p); break; }
        if (is_authed) buf_cat(&out, body_start, (int)(body_end - body_start));
        p = body_end + 11;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 16: Strip remaining htx: directives
   ================================================================ */
static char *strip_directives(const char *html) {
    Buf out = buf_new(strlen(html) + 1);
    const char *p = html;
    while (*p) {
        if (strncmp(p, "<htx:", 5) == 0 || strncmp(p, "</htx:", 6) == 0) {
            const char *end = strchr(p, '>');
            if (end) { p = end + 1; continue; }
        }
        buf_cat(&out, p, 1);
        p++;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 6: htx:include -- recursive partial inclusion
   ================================================================ */
static char *resolve_includes(const char *html, const char *template_dir, int depth) {
    if (depth > 10) return strdup(html);
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "include");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));
        char attrs[1024];
        extract_tag_attrs(tag, "include", attrs, sizeof(attrs));
        char src[512];
        if (get_attr(attrs, "src", src, sizeof(src))) {
            char path[4096];
            if (src[0] == '/') snprintf(path, sizeof(path), "%s%s", template_dir, src);
            else snprintf(path, sizeof(path), "%s/%s", template_dir, src);
            /* Path traversal defense */
            if (strstr(src, "..")) {
                buf_cats(&out, "<!-- include rejected: path traversal -->");
            } else {
                char *content = read_file(path);
                if (content) {
                    char *resolved = resolve_includes(content, template_dir, depth + 1);
                    buf_cats(&out, resolved);
                    free(resolved);
                    free(content);
                } else {
                    buf_cats(&out, "<!-- include not found -->");
                }
            }
        }
        const char *end = strchr(tag, '>');
        p = end ? end + 1 : tag + 5;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 7: htx:component -- composition with props and slots
   ================================================================ */
static char *resolve_components(const char *html, const char *template_dir, int depth) {
    if (depth > 10) return strdup(html);
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "component");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));
        char attrs[1024];
        int self_closing = extract_tag_attrs(tag, "component", attrs, sizeof(attrs));
        char src[512];
        get_attr(attrs, "src", src, sizeof(src));

        /* Extract slot content if not self-closing */
        char *slot_content = NULL;
        const char *after_tag;
        if (!self_closing) {
            const char *body_start = strchr(tag, '>');
            if (body_start) {
                body_start++;
                const char *body_end = strstr(body_start, "</htx:component>");
                if (body_end) {
                    slot_content = strndup(body_start, body_end - body_start);
                    after_tag = body_end + 16;
                } else { after_tag = body_start; }
            } else { after_tag = tag + 5; }
        } else {
            const char *end = strchr(tag, '>');
            after_tag = end ? end + 1 : tag + 5;
        }

        /* Load component file */
        if (strstr(src, "..")) {
            buf_cats(&out, "<!-- component rejected: path traversal -->");
        } else {
            char path[4096];
            if (src[0] == '/') snprintf(path, sizeof(path), "%s%s", template_dir, src);
            else snprintf(path, sizeof(path), "%s/%s", template_dir, src);
            char *comp = read_file(path);
            if (comp) {
                /* Replace props: scan attrs for key="value" pairs, replace {htx:propName} */
                /* This is simplified -- full version parses htx:props defaults */
                char *resolved = strdup(comp);

                /* Inject slot at <htx:slot /> */
                if (slot_content) {
                    char *slot_marker = strstr(resolved, "<htx:slot");
                    if (slot_marker) {
                        char *slot_end = strchr(slot_marker, '>');
                        if (slot_end) {
                            slot_end++;
                            Buf cb = buf_new(strlen(resolved) + strlen(slot_content));
                            buf_cat(&cb, resolved, (int)(slot_marker - resolved));
                            buf_cats(&cb, slot_content);
                            buf_cats(&cb, slot_end);
                            free(resolved);
                            resolved = buf_take(&cb);
                        }
                    }
                }
                /* Recurse */
                char *final = resolve_components(resolved, template_dir, depth + 1);
                buf_cats(&out, final);
                free(final);
                free(resolved);
                free(comp);
            } else {
                buf_cats(&out, "<!-- component not found -->");
            }
        }
        free(slot_content);
        p = after_tag;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 8: htx:script extraction
   ================================================================ */
typedef struct { char *scripts[128]; int count; } ScriptCollector;

static char *extract_scripts(const char *html, ScriptCollector *sc) {
    Buf out = buf_new(strlen(html) + 1);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "script");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));
        const char *body_start = strchr(tag, '>');
        if (!body_start) { buf_cats(&out, p); break; }
        body_start++;
        const char *body_end = strstr(body_start, "</htx:script>");
        if (!body_end) { buf_cats(&out, p); break; }
        if (sc->count < 128) {
            sc->scripts[sc->count] = strndup(body_start, body_end - body_start);
            sc->count++;
        }
        p = body_end + 13;
    }
    return buf_take(&out);
}

static char *inject_scripts(const char *html, ScriptCollector *sc) {
    if (sc->count == 0) return strdup(html);
    Buf out = buf_new(strlen(html) + 1024);
    const char *body_end = strstr(html, "</body>");
    if (body_end) {
        buf_cat(&out, html, (int)(body_end - html));
    } else {
        buf_cats(&out, html);
    }
    for (int i = 0; i < sc->count; i++) {
        buf_cats(&out, "\n<script>(function(){\n");
        buf_cats(&out, sc->scripts[i]);
        buf_cats(&out, "\n})();</script>\n");
        free(sc->scripts[i]);
    }
    if (body_end) buf_cats(&out, body_end);
    return buf_take(&out);
}

/* ================================================================
   Pipes: upper, lower, trim, length, json
   ================================================================ */
static char *apply_pipe(const char *val, const char *pipe_name) {
    if (strcmp(pipe_name, "upper") == 0) {
        char *r = strdup(val);
        for (char *c = r; *c; c++) *c = toupper(*c);
        return r;
    }
    if (strcmp(pipe_name, "lower") == 0) {
        char *r = strdup(val);
        for (char *c = r; *c; c++) *c = tolower(*c);
        return r;
    }
    if (strcmp(pipe_name, "length") == 0) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%d", (int)strlen(val));
        return strdup(buf);
    }
    if (strcmp(pipe_name, "trim") == 0) {
        const char *s = val;
        while (*s == ' ' || *s == '\t' || *s == '\n') s++;
        const char *e = val + strlen(val) - 1;
        while (e > s && (*e == ' ' || *e == '\t' || *e == '\n')) e--;
        return strndup(s, e - s + 1);
    }
    return strdup(val);
}

/* ================================================================
   HMAC-SHA256 (reuse bootstrap's SHA-256 -- inline minimal version)
   ================================================================ */
static const uint32_t K_SHA[64] = {
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
};
#define RR(x,n) (((x)>>(n))|((x)<<(32-(n))))
#define CH(x,y,z) (((x)&(y))^((~(x))&(z)))
#define MAJ(x,y,z) (((x)&(y))^((x)&(z))^((y)&(z)))
#define EP0(x) (RR(x,2)^RR(x,13)^RR(x,22))
#define EP1(x) (RR(x,6)^RR(x,11)^RR(x,25))
#define SIG0(x) (RR(x,7)^RR(x,18)^((x)>>3))
#define SIG1(x) (RR(x,17)^RR(x,19)^((x)>>10))

static void sha256(const uint8_t *data, size_t len, uint8_t out[32]) {
    uint32_t h[8]={0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19};
    size_t padlen=((len+8)/64+1)*64; uint8_t *msg=calloc(padlen,1);
    memcpy(msg,data,len); msg[len]=0x80;
    uint64_t bits=len*8; for(int i=0;i<8;i++) msg[padlen-1-i]=(uint8_t)(bits>>(i*8));
    for(size_t off=0;off<padlen;off+=64){
        uint32_t w[64]; for(int i=0;i<16;i++) w[i]=((uint32_t)msg[off+i*4]<<24)|((uint32_t)msg[off+i*4+1]<<16)|((uint32_t)msg[off+i*4+2]<<8)|msg[off+i*4+3];
        for(int i=16;i<64;i++) w[i]=SIG1(w[i-2])+w[i-7]+SIG0(w[i-15])+w[i-16];
        uint32_t a=h[0],b=h[1],c=h[2],d=h[3],e=h[4],f=h[5],g=h[6],hh=h[7];
        for(int i=0;i<64;i++){uint32_t t1=hh+EP1(e)+CH(e,f,g)+K_SHA[i]+w[i],t2=EP0(a)+MAJ(a,b,c);hh=g;g=f;f=e;e=d+t1;d=c;c=b;b=a;a=t1+t2;}
        h[0]+=a;h[1]+=b;h[2]+=c;h[3]+=d;h[4]+=e;h[5]+=f;h[6]+=g;h[7]+=hh;
    }
    free(msg); for(int i=0;i<8;i++){out[i*4]=(uint8_t)(h[i]>>24);out[i*4+1]=(uint8_t)(h[i]>>16);out[i*4+2]=(uint8_t)(h[i]>>8);out[i*4+3]=(uint8_t)h[i];}
}

static void hmac_sha256_sign(const char *key, const char *data, char *hex_out) {
    uint8_t kpad[64]={0}; int klen=strlen(key);
    if(klen>64){sha256((const uint8_t*)key,klen,kpad);}else{memcpy(kpad,key,klen);}
    uint8_t ipad[64],opad[64]; for(int i=0;i<64;i++){ipad[i]=kpad[i]^0x36;opad[i]=kpad[i]^0x5c;}
    int dlen=strlen(data); uint8_t *inner=malloc(64+dlen); memcpy(inner,ipad,64); memcpy(inner+64,data,dlen);
    uint8_t ih[32]; sha256(inner,64+dlen,ih); free(inner);
    uint8_t outer[96]; memcpy(outer,opad,64); memcpy(outer+64,ih,32);
    uint8_t oh[32]; sha256(outer,96,oh);
    for(int i=0;i<32;i++) sprintf(hex_out+i*2,"%02x",oh[i]); hex_out[64]=0;
}

/* ================================================================
   Stage 11: htx:grant -- signed capability tokens
   ================================================================ */
static char *resolve_grants(const char *html, Ctx *ctx, const char *secret) {
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "grant");
        if (!tag) { buf_cats(&out, p); break; }
        buf_cat(&out, p, (int)(tag - p));
        char attrs[1024];
        extract_tag_attrs(tag, "grant", attrs, sizeof(attrs));
        char type[64], as[64], module[64];
        get_attr(attrs, "type", type, sizeof(type));
        get_attr(attrs, "as", as, sizeof(as));
        get_attr(attrs, "module", module, sizeof(module));

        /* Sign a grant token */
        char payload[512];
        snprintf(payload, sizeof(payload), "{\"type\":\"%s\",\"module\":\"%s\",\"scope\":\"channel:%s\"}",
                 type, module, module);
        char sig[65];
        hmac_sha256_sign(secret, payload, sig);
        /* Store base64-ish token: payload.sig */
        char token[1024];
        snprintf(token, sizeof(token), "%.200s.%.64s", payload, sig);
        ctx_set(ctx, as, token);

        const char *end = strchr(tag, '>');
        p = end ? end + 1 : tag + 5;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 12: htx:action -- two-phase mutation tokens
   ================================================================ */
static char *resolve_actions(const char *html, Ctx *ctx, const char *secret) {
    Buf out = buf_new(strlen(html) + 256);
    const char *p = html;
    while (1) {
        const char *tag = find_directive(p, "action");
        if (!tag) { buf_cats(&out, p); break; }
        /* Make sure it's not htx:auth */
        if (strncmp(tag, "<htx:auth", 9) == 0) {
            buf_cat(&out, p, (int)(tag - p) + 1);
            p = tag + 1;
            continue;
        }
        buf_cat(&out, p, (int)(tag - p));
        char attrs[1024];
        extract_tag_attrs(tag, "action", attrs, sizeof(attrs));
        char name[128], type[128], record[256];
        get_attr(attrs, "name", name, sizeof(name));
        get_attr(attrs, "type", type, sizeof(type));
        get_attr(attrs, "record", record, sizeof(record));

        /* Resolve expressions in record attr */
        char *resolved_record = eval_expressions(record, ctx);

        /* Sign action token */
        char payload[512];
        snprintf(payload, sizeof(payload), "{\"action\":\"%s\",\"type\":\"%s\",\"recordId\":\"%s\"}",
                 name, type, resolved_record);
        char sig[65];
        hmac_sha256_sign(secret, payload, sig);
        char token[1024];
        snprintf(token, sizeof(token), "%.200s.%.64s", payload, sig);

        /* Store in $actions.name */
        char action_key[256];
        snprintf(action_key, sizeof(action_key), "$actions.%s", name);
        ctx_set(ctx, action_key, token);

        free(resolved_record);
        const char *end = strchr(tag, '>');
        p = end ? end + 1 : tag + 5;
    }
    return buf_take(&out);
}

/* ================================================================
   Stage 18: Layout wrapping
   ================================================================ */
static char *wrap_layout(const char *html, const char *template_dir) {
    char layout_path[4096];
    snprintf(layout_path, sizeof(layout_path), "%s/_layout.htx", template_dir);
    char *layout = read_file(layout_path);
    if (!layout) return strdup(html);

    /* Replace __content__ with the page content */
    char *marker = strstr(layout, "__content__");
    if (!marker) { free(layout); return strdup(html); }

    Buf out = buf_new(strlen(layout) + strlen(html));
    buf_cat(&out, layout, (int)(marker - layout));
    buf_cats(&out, html);
    buf_cats(&out, marker + 11);
    free(layout);
    return buf_take(&out);
}

/* ================================================================
   The 22-stage pipeline
   ================================================================ */
static char *htx_pipeline(const char *template_content, Ctx *ctx, const char *template_dir) {
    char *stage;
    const char *secret = ctx_get(ctx, "$secret") ? ctx_get(ctx, "$secret") : "htx-default-secret";
    ScriptCollector sc = {.count = 0};

    /* Stages 1-4: HTTP serving, channels, middleware, context -- handled by caller */

    /* Stage 5: Pre-processors -- skip */

    /* Stage 6: htx:include */
    if (template_dir) {
        stage = resolve_includes(template_content, template_dir, 0);
    } else {
        stage = strdup(template_content);
    }

    /* Stage 7: htx:component */
    if (template_dir) {
        char *s7 = resolve_components(stage, template_dir, 0);
        free(stage); stage = s7;
    }

    /* Stage 8: htx:script extraction */
    char *s8 = extract_scripts(stage, &sc);
    free(stage); stage = s8;

    /* Stage 9: htx:let */
    char *s9 = resolve_let(stage, ctx);
    free(stage); stage = s9;

    /* Stage 10: htx:data -- skip (no adapter in CLI mode) */

    /* Stage 11: htx:grant */
    char *s11 = resolve_grants(stage, ctx, secret);
    free(stage); stage = s11;

    /* Stage 12: htx:action */
    char *s12 = resolve_actions(stage, ctx, secret);
    free(stage); stage = s12;

    /* Stage 13: htx:auth */
    char *s13 = resolve_auth(stage, ctx);
    free(stage); stage = s13;

    /* Stage 14: htx:each + htx:if */
    char *s14a = resolve_each(stage, ctx);
    free(stage);
    char *s14b = resolve_if(s14a, ctx);
    free(s14a); stage = s14b;

    /* Stage 15: Expression evaluation */
    char *s15 = eval_expressions(stage, ctx);
    free(stage); stage = s15;

    /* Stage 16: Strip remaining directives */
    char *s16 = strip_directives(stage);
    free(stage); stage = s16;

    /* Stage 17: Post-processors -- skip */

    /* Stage 18: Layout wrapping */
    if (template_dir) {
        char *s18 = wrap_layout(stage, template_dir);
        free(stage); stage = s18;

        /* Stage 19: Post-layout pass (includes, auth, control flow, expressions) */
        char *s19a = resolve_auth(stage, ctx);
        free(stage);
        char *s19b = resolve_if(s19a, ctx);
        free(s19a);
        char *s19c = eval_expressions(s19b, ctx);
        free(s19b); stage = s19c;
    }

    /* Stage 20: Script injection */
    char *s20 = inject_scripts(stage, &sc);
    free(stage); stage = s20;

    /* Stage 21: Final expression pass */
    char *s21 = eval_expressions(stage, ctx);
    free(stage); stage = s21;

    /* Stage 22: Finalize (htx:raw stripping would go here) */

    return stage;
}

/* ================================================================
   Main -- resolve a template from stdin or file
   ================================================================ */
int main(int argc, char **argv) {
    Ctx *ctx = ctx_new(NULL);

    /* Parse key=value args into context */
    const char *template_file = NULL;
    const char *template_dir = NULL;
    for (int i = 1; i < argc; i++) {
        char *eq = strchr(argv[i], '=');
        if (eq) {
            char key[256];
            int klen = (int)(eq - argv[i]);
            if (klen >= 256) klen = 255;
            memcpy(key, argv[i], klen); key[klen] = 0;
            ctx_set(ctx, key, eq + 1);
        } else if (!template_file) {
            template_file = argv[i];
        }
    }

    /* Detect template dir */
    if (template_file) {
        char *last_slash = strrchr(template_file, '/');
        if (last_slash) {
            int dlen = (int)(last_slash - template_file);
            char *dir = malloc(dlen + 1);
            memcpy(dir, template_file, dlen); dir[dlen] = 0;
            template_dir = dir;
        } else {
            template_dir = ".";
        }
    }

    /* Read template */
    char *tmpl = NULL;
    if (template_file) {
        tmpl = read_file(template_file);
        if (!tmpl) { fprintf(stderr, "Cannot read: %s\n", template_file); return 1; }
    } else {
        /* Read from stdin */
        Buf b = buf_new(4096);
        char chunk[1024];
        while (fgets(chunk, sizeof(chunk), stdin)) buf_cats(&b, chunk);
        tmpl = buf_take(&b);
    }

    /* Run pipeline */
    char *result = htx_pipeline(tmpl, ctx, template_dir);
    printf("%s", result);

    free(result);
    free(tmpl);
    ctx_free(ctx);
    return 0;
}
