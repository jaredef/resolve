// Pi Resolver — PRESTO Chat Server
//
// A minimal HTTP server implementing the PRESTO bilateral boundary at the web layer,
// composing with the Pi Resolver's bilateral boundary at the attention layer.
//
// The resolution stack on one Raspberry Pi:
//   REST    — HTTP request/response
//   PRESTO  — Server-rendered HTML, bilateral boundary (server directives consumed before response)
//   RESOLVE — System namespace carries constraints, user namespace carries input
//   Pi Resolver — Sigmoid attention, bilateral mask, sparsemax output
//
// Zero dependencies. C standard library + POSIX sockets.

#include "model.h"
#include "attention.h"
#include "math_util.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define PORT 8099
#define BUF_SIZE 4096
#define MAX_BODY 2048
#define MAX_RESPONSE 8192

// === Global Model ===

static Model g_model;
static const char *g_system_prompt = "You are a minimal resolver. Respond concisely.";

// === HTML Templates (PRESTO: server-rendered, no client JS framework) ===

static const char *HTML_PAGE =
    "<!DOCTYPE html>\n"
    "<html><head><meta charset=\"utf-8\"><title>Pi Resolver</title>\n"
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n"
    "<style>\n"
    "  * { margin:0; padding:0; box-sizing:border-box; }\n"
    "  body { font-family:monospace; background:#111; color:#e0e0e0; max-width:640px; margin:0 auto; padding:16px; }\n"
    "  h1 { font-size:18px; color:#7c8aff; margin-bottom:4px; }\n"
    "  .sub { font-size:12px; color:#666; margin-bottom:16px; }\n"
    "  .chat { min-height:200px; margin-bottom:16px; }\n"
    "  .msg { padding:8px; margin-bottom:8px; border-radius:4px; font-size:14px; }\n"
    "  .user { background:#1a1a2e; border-left:3px solid #7c8aff; }\n"
    "  .bot { background:#1a2e1a; border-left:3px solid #4caf50; }\n"
    "  .meta { font-size:11px; color:#555; margin-top:4px; }\n"
    "  form { display:flex; gap:8px; }\n"
    "  input[type=text] { flex:1; padding:8px; background:#1a1a1a; border:1px solid #333; color:#e0e0e0; border-radius:4px; font-family:monospace; font-size:14px; }\n"
    "  button { padding:8px 16px; background:#7c8aff; color:#111; border:none; border-radius:4px; cursor:pointer; font-family:monospace; font-weight:bold; }\n"
    "  .info { font-size:11px; color:#444; margin-top:16px; line-height:1.6; }\n"
    "</style></head>\n"
    "<body>\n"
    "  <h1>Pi Resolver</h1>\n"
    "  <div class=\"sub\">Sigmoid attention. Bilateral boundary. Sparsemax output. Running on Raspberry Pi 5.</div>\n"
    "  <div class=\"chat\" id=\"chat\">%s</div>\n"
    "  <form method=\"POST\" action=\"/chat\">\n"
    "    <input type=\"text\" name=\"msg\" placeholder=\"Enter message...\" autofocus>\n"
    "    <button type=\"submit\">Send</button>\n"
    "  </form>\n"
    "  <div class=\"info\">\n"
    "    Architecture: 4 essential constraints, 7 contingent replacements<br>\n"
    "    Model: ~500K params, byte-level vocab (256), random weights<br>\n"
    "    Bilateral boundary: user namespace cannot attend to system namespace<br>\n"
    "    Output: sparsemax (exact zeros, |B_t| genuinely reducible to 1)<br>\n"
    "    <br>This is an architectural proof, not a trained model.<br>\n"
    "    The output is structurally valid gibberish. The architecture is the contribution.\n"
    "  </div>\n"
    "</body></html>\n";

// === Chat State (in-memory, single session) ===

static char g_chat_html[MAX_RESPONSE];
static int g_chat_len = 0;

static void chat_append(const char *cls, const char *text, const char *meta) {
    char buf[1024];
    int n = snprintf(buf, sizeof(buf),
        "<div class=\"msg %s\">%s%s%s%s</div>\n",
        cls, text,
        meta ? "<div class=\"meta\">" : "",
        meta ? meta : "",
        meta ? "</div>" : "");
    if (g_chat_len + n < MAX_RESPONSE - 1) {
        memcpy(g_chat_html + g_chat_len, buf, n);
        g_chat_len += n;
        g_chat_html[g_chat_len] = '\0';
    }
}

// === Generate Response from Model ===

static void generate_response(const char *user_input, char *output, int max_out, int *bt_final) {
    Token tokens[128];
    int prompt_len = build_sequence(tokens, g_system_prompt, user_input, 128);

    // Process prompt through model
    for (int i = 0; i < prompt_len; i++) {
        model_forward(&g_model, tokens, i);
    }

    // Generate up to 64 tokens
    int out_pos = 0;
    int max_gen = 64;
    if (max_gen > max_out - 1) max_gen = max_out - 1;

    for (int g = 0; g < max_gen; g++) {
        int pos = prompt_len + g;
        if (pos >= 128) break;

        if (g > 0) {
            model_forward(&g_model, tokens, pos - 1);
        }

        // Count |B_t|
        int bt = 0;
        for (int i = 0; i < g_model.config.vocab_size; i++) {
            if (g_model.logits[i] > 0.0f) bt++;
        }
        *bt_final = bt;

        // Select best token (argmax over sparsemax)
        int best = 0;
        float best_val = g_model.logits[0];
        for (int i = 1; i < g_model.config.vocab_size; i++) {
            if (g_model.logits[i] > best_val) {
                best_val = g_model.logits[i];
                best = i;
            }
        }

        if (best == 0) break;  // Null byte = stop

        // Only emit printable ASCII
        if (best >= 32 && best < 127) {
            output[out_pos++] = (char)best;
        } else {
            output[out_pos++] = '.';
        }

        tokens[pos].token = (uint8_t)best;
        tokens[pos].ns = NS_OUTPUT;
        tokens[pos].pos_type = POS_CONTENT;
        tokens[pos].position = pos;
    }

    output[out_pos] = '\0';
}

// === HTTP Parsing (minimal, sufficient) ===

static int parse_method(const char *req) {
    if (strncmp(req, "GET ", 4) == 0) return 0;
    if (strncmp(req, "POST ", 5) == 0) return 1;
    return -1;
}

static const char* parse_path(const char *req) {
    const char *start = strchr(req, ' ');
    if (!start) return "/";
    start++;
    const char *end = strchr(start, ' ');
    if (!end) return "/";
    static char path[256];
    int len = end - start;
    if (len > 255) len = 255;
    memcpy(path, start, len);
    path[len] = '\0';
    return path;
}

static void url_decode(char *dst, const char *src, int max) {
    int di = 0;
    for (int i = 0; src[i] && di < max - 1; i++) {
        if (src[i] == '%' && src[i+1] && src[i+2]) {
            char hex[3] = {src[i+1], src[i+2], 0};
            dst[di++] = (char)strtol(hex, NULL, 16);
            i += 2;
        } else if (src[i] == '+') {
            dst[di++] = ' ';
        } else {
            dst[di++] = src[i];
        }
    }
    dst[di] = '\0';
}

static void parse_form_body(const char *body, char *msg_out, int max) {
    // Parse "msg=..." from URL-encoded form body
    const char *p = strstr(body, "msg=");
    if (!p) { msg_out[0] = '\0'; return; }
    p += 4;
    const char *end = strchr(p, '&');
    char encoded[512];
    int len = end ? (int)(end - p) : (int)strlen(p);
    if (len > 511) len = 511;
    memcpy(encoded, p, len);
    encoded[len] = '\0';
    url_decode(msg_out, encoded, max);
}

// === HTTP Response ===

static void send_response(int client, int status, const char *content_type, const char *body, int body_len) {
    char header[512];
    int hlen = snprintf(header, sizeof(header),
        "HTTP/1.1 %d %s\r\n"
        "Content-Type: %s\r\n"
        "Content-Length: %d\r\n"
        "Connection: close\r\n"
        "\r\n",
        status, status == 200 ? "OK" : (status == 303 ? "See Other" : "Not Found"),
        content_type, body_len);
    write(client, header, hlen);
    if (body_len > 0) write(client, body, body_len);
}

static void send_redirect(int client, const char *location) {
    char header[512];
    int hlen = snprintf(header, sizeof(header),
        "HTTP/1.1 303 See Other\r\n"
        "Location: %s\r\n"
        "Content-Length: 0\r\n"
        "Connection: close\r\n"
        "\r\n", location);
    write(client, header, hlen);
}

// === Main ===

int main(void) {
    // Initialize model
    Config cfg = {
        .dim = 64, .n_layers = 2, .n_heads = 4, .head_dim = 16,
        .vocab_size = 256, .max_seq_len = 128, .ffn_dim = 256
    };
    model_init(&g_model, cfg);
    model_derive_weights(&g_model);

    g_chat_html[0] = '\0';
    g_chat_len = 0;

    // Create socket
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) { perror("socket"); return 1; }

    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(PORT)
    };

    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind");
        return 1;
    }

    if (listen(server_fd, 4) < 0) { perror("listen"); return 1; }

    printf("Pi Resolver server running on http://localhost:%d\n", PORT);
    printf("Architecture: sigmoid attention, bilateral boundary, sparsemax output\n");
    printf("Model: %d dim, %d layers, %d vocab, ~500K params (random weights)\n",
           cfg.dim, cfg.n_layers, cfg.vocab_size);
    printf("This is an architectural proof. The output is structurally valid, not semantically meaningful.\n\n");

    while (1) {
        int client = accept(server_fd, NULL, NULL);
        if (client < 0) continue;

        char req[BUF_SIZE];
        int n = read(client, req, BUF_SIZE - 1);
        if (n <= 0) { close(client); continue; }
        req[n] = '\0';

        int method = parse_method(req);
        const char *path = parse_path(req);

        if (method == 0 && strcmp(path, "/") == 0) {
            // GET / — render chat page
            char page[MAX_RESPONSE + 4096];
            int plen = snprintf(page, sizeof(page), HTML_PAGE, g_chat_html);
            send_response(client, 200, "text/html; charset=utf-8", page, plen);

        } else if (method == 1 && strcmp(path, "/chat") == 0) {
            // POST /chat — process message
            const char *body = strstr(req, "\r\n\r\n");
            if (body) {
                body += 4;
                char msg[512];
                parse_form_body(body, msg, sizeof(msg));

                if (msg[0]) {
                    // Append user message
                    chat_append("user", msg, NULL);

                    // Generate response
                    char response[256];
                    int bt = 0;
                    generate_response(msg, response, sizeof(response), &bt);

                    // Append bot response with |B_t| metadata
                    char meta[128];
                    snprintf(meta, sizeof(meta), "|B_t| = %d at final position", bt);
                    chat_append("bot", response[0] ? response : "(empty emission)", meta);

                    printf("  user: %s\n  model: %s  [|B_t|=%d]\n\n", msg, response, bt);
                }
            }
            send_redirect(client, "/");

        } else {
            const char *not_found = "404";
            send_response(client, 404, "text/plain", not_found, 3);
        }

        close(client);
    }

    return 0;
}
