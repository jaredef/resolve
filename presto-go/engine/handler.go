package engine

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var (
	reLet            = regexp.MustCompile(`<htx:let\s+([a-zA-Z_]\w*)\s*=\s*"([^"]*)"\s*/>`)
	rePageScript     = regexp.MustCompile(`<htx:script>([\s\S]*?)</htx:script>`)
	reStripDirective = regexp.MustCompile(`</?htx:[^>]*>`)
	reRawOpen        = regexp.MustCompile(`<htx:raw[^>]*>`)
	reRawClose       = regexp.MustCompile(`</htx:raw>`)
)

// Engine is the complete htxlang engine.
type Engine struct {
	Router            *Router
	IncludeResolver   *IncludeResolver
	ComponentResolver *ComponentResolver
	ExpressionEngine  *ExpressionEngine
	DataResolver      *DataResolver
	ControlFlow       *ControlFlow
	LayoutResolver    *LayoutResolver
	GrantResolver     *GrantResolver
	MutationHandler   *MutationHandler
	ChannelMiddleware *ChannelMiddleware
	Registry          *ModuleRegistry
	TokenService      *TokenService
	Adapter           ContentAdapter
	TemplateDir       string
	PublicDir         string
}

// EngineConfig holds configuration for creating an engine.
type EngineConfig struct {
	TemplateDir string
	PublicDir   string
	Secret      string
	Adapter     ContentAdapter
	Modules     []Module
}

// NewEngine creates a fully initialized engine.
func NewEngine(cfg EngineConfig) *Engine {
	ts := NewTokenService(cfg.Secret)
	expr := NewExpressionEngine()
	registry := NewModuleRegistry()

	e := &Engine{
		Router:            NewRouter(cfg.TemplateDir),
		IncludeResolver:   NewIncludeResolver(cfg.TemplateDir),
		ComponentResolver: NewComponentResolver(cfg.TemplateDir),
		ExpressionEngine:  expr,
		DataResolver:      NewDataResolver(),
		ControlFlow:       NewControlFlow(expr),
		LayoutResolver:    NewLayoutResolver(cfg.TemplateDir),
		GrantResolver:     NewGrantResolver(ts),
		MutationHandler:   NewMutationHandler(ts),
		ChannelMiddleware: NewChannelMiddleware(registry, ts),
		Registry:          registry,
		TokenService:      ts,
		Adapter:           cfg.Adapter,
		TemplateDir:       cfg.TemplateDir,
		PublicDir:         cfg.PublicDir,
	}

	if cfg.Modules != nil {
		registry.BootAll(cfg.Modules)
	}

	return e
}

// ServeHTTP implements http.Handler — the 22-stage pipeline.
func (e *Engine) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Stage 1: Static files
	if e.PublicDir != "" {
		staticPath := filepath.Join(e.PublicDir, r.URL.Path)
		if info, err := os.Stat(staticPath); err == nil && !info.IsDir() {
			http.ServeFile(w, r, staticPath)
			return
		}
	}

	// Stage 2: Channel API
	if strings.HasPrefix(r.URL.Path, "/api/channel/") {
		e.ChannelMiddleware.Handle(w, r)
		return
	}

	// Stage 3: Middleware chain (simplified — run through middleware then handle template)
	// For now, go straight to template handling. Full middleware chain can wrap this.
	status, content, contentType := e.handleTemplate(r)
	w.Header().Set("Content-Type", contentType)
	w.WriteHeader(status)
	w.Write([]byte(content))
}

func (e *Engine) handleTemplate(r *http.Request) (int, string, string) {
	match := e.Router.Resolve(r.URL.Path)
	if match == nil {
		return 404, "Not Found", "text/plain"
	}

	// Mutation execution (POST with token)
	if r.Method == "POST" {
		return e.executeMutation(r, match)
	}

	isHtmx := r.Header.Get("HX-Request") != ""
	content, err := os.ReadFile(match.FilePath)
	if err != nil {
		return 500, "Internal Server Error", "text/plain"
	}

	data := DataContext{
		"route":  mapStrStr(match.Params),
		"query":  queryParams(r),
		"method": r.Method,
		"path":   r.URL.Path,
	}

	// Stage 4: Context providers
	for name, provider := range e.Registry.GetContextProviders() {
		data[name] = provider.Resolve(r)
	}

	// Stage 5: Pre-layout template processors
	tmpl := string(content)
	for _, processor := range e.Registry.GetProcessors("pre-layout") {
		result := processor.Process(tmpl, data)
		tmpl = result.Content
		if result.Redirect != "" {
			return 302, result.Redirect, "text/plain"
		}
	}

	// Stage 6: Include expansion
	tmpl = e.IncludeResolver.Expand(tmpl, match.FilePath, 0)

	// Stage 7: Component resolution
	scriptCollector := []string{}
	tmpl = e.ComponentResolver.Resolve(tmpl, data, 0, &scriptCollector, match.FilePath)

	// Stage 8: Page-level htx:script extraction
	tmpl = extractPageScripts(tmpl, &scriptCollector)

	// Stage 9: htx:let variable binding
	tmpl = resolveLet(tmpl, data)

	// Stage 10: htx:data resolution
	tmpl, data = e.DataResolver.Resolve(tmpl, data, e.Adapter)

	// Stage 11: htx:grant resolution
	userId := getUserId(data)
	tmpl, data = e.GrantResolver.Resolve(tmpl, data, userId)

	// Stage 12: htx:action preparation
	tmpl, data = e.MutationHandler.Prepare(tmpl, data)

	// Stage 13: htx:auth / htx:unauth
	tmpl = ResolveAuth(tmpl, data)

	// Stage 14: Control flow (htx:each, htx:if)
	tmpl = e.ControlFlow.Resolve(tmpl, data)

	// Stage 15: Expression evaluation
	tmpl = e.ExpressionEngine.Evaluate(tmpl, data)

	// Extract layout directive BEFORE stripping (so it survives stage 16)
	layoutDir := extractLayoutDirective(tmpl)
	tmpl = layoutDir.cleanContent

	// Stage 16: Directive stripping
	tmpl = stripRemainingDirectives(tmpl)

	// Stage 17: Post-layout template processors
	for _, processor := range e.Registry.GetProcessors("post-layout") {
		result := processor.Process(tmpl, data)
		tmpl = result.Content
	}

	// Stage 18: Layout wrapping
	tmpl = e.LayoutResolver.WrapWithDirective(tmpl, match.FilePath, isHtmx, layoutDir.none, layoutDir.src)

	// Stage 19: Post-layout resolution pass
	tmpl = e.IncludeResolver.Expand(tmpl, match.FilePath, 0)
	tmpl = ResolveAuth(tmpl, data)
	tmpl = e.ControlFlow.Resolve(tmpl, data)

	// Stage 20: Script injection
	if len(scriptCollector) > 0 {
		scriptBlock := "<!--PRESTO:SCRIPT:BEGIN-->\n" + strings.Join(scriptCollector, "\n") + "\n<!--PRESTO:SCRIPT:END-->"
		bodyClose := strings.LastIndex(tmpl, "</body>")
		if bodyClose >= 0 {
			tmpl = tmpl[:bodyClose] + scriptBlock + "\n" + tmpl[bodyClose:]
		} else {
			tmpl = tmpl + scriptBlock
		}
	}

	// Stage 21: Final expression pass
	tmpl = e.ExpressionEngine.Evaluate(tmpl, data)

	// Stage 22: Finalize
	tmpl = strings.Replace(tmpl, "<!--PRESTO:SCRIPT:BEGIN-->", "<script>", 1)
	tmpl = strings.Replace(tmpl, "<!--PRESTO:SCRIPT:END-->", "</script>", 1)
	tmpl = reRawOpen.ReplaceAllString(tmpl, "")
	tmpl = reRawClose.ReplaceAllString(tmpl, "")

	return 200, tmpl, "text/html"
}

func (e *Engine) executeMutation(r *http.Request, match *RouteMatch) (int, string, string) {
	var body map[string]interface{}
	ct := r.Header.Get("Content-Type")
	if strings.Contains(ct, "application/json") {
		json.NewDecoder(r.Body).Decode(&body)
	} else {
		r.ParseForm()
		body = map[string]interface{}{}
		for k, v := range r.PostForm {
			if len(v) > 0 {
				body[k] = v[0]
			}
		}
	}

	token, _ := body["_action_token"].(string)
	if token == "" {
		return 400, "Missing action token", "text/plain"
	}

	payload, err := e.MutationHandler.Execute(token)
	if err != nil {
		return 403, "Invalid or expired token", "text/plain"
	}

	action, _ := payload["action"].(string)
	typeName, _ := payload["type"].(string)
	recordId, _ := payload["recordId"].(string)

	if e.Adapter == nil {
		return 500, "No adapter configured", "text/plain"
	}

	var result interface{}
	var opErr error

	switch action {
	case "create":
		result, opErr = e.Adapter.Create(typeName, body)
	case "update":
		_, opErr = e.Adapter.Update(typeName, recordId, body)
		result = map[string]string{"status": "updated"}
	case "delete":
		_, opErr = e.Adapter.Delete(typeName, recordId)
		result = map[string]string{"status": "deleted"}
	default:
		return 400, "Unknown action: " + action, "text/plain"
	}

	if opErr != nil {
		return 500, opErr.Error(), "text/plain"
	}

	b, _ := json.Marshal(result)
	return 200, string(b), "application/json"
}

func extractPageScripts(content string, collector *[]string) string {
	return rePageScript.ReplaceAllStringFunc(content, func(match string) string {
		sub := rePageScript.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		*collector = append(*collector, strings.TrimSpace(sub[1]))
		return ""
	})
}

func resolveLet(content string, data DataContext) string {
	return reLet.ReplaceAllStringFunc(content, func(match string) string {
		sub := reLet.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		name := sub[1]
		value := sub[2]
		data[name] = value
		return ""
	})
}

func stripRemainingDirectives(content string) string {
	// Protect raw blocks from stripping
	protected := map[string]string{}
	counter := 0
	result := reRawPro.ReplaceAllStringFunc(content, func(match string) string {
		marker := fmt.Sprintf("<!--STRIP_PROTECTED_%d-->", counter)
		protected[marker] = match
		counter++
		return marker
	})

	result = reStripDirective.ReplaceAllString(result, "")

	// Restore raw blocks
	for marker, original := range protected {
		result = strings.Replace(result, marker, original, 1)
	}
	return result
}

func getUserId(data DataContext) string {
	if auth, ok := data["auth"].(map[string]interface{}); ok {
		if user, ok := auth["user"].(map[string]interface{}); ok {
			if id, ok := user["id"].(string); ok {
				return id
			}
		}
	}
	return "anonymous"
}

func mapStrStr(m map[string]string) map[string]interface{} {
	out := make(map[string]interface{}, len(m))
	for k, v := range m {
		out[k] = v
	}
	return out
}

func queryParams(r *http.Request) map[string]interface{} {
	out := make(map[string]interface{})
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			out[k] = v[0]
		}
	}
	return out
}

// HandleRequest is a test-friendly version that takes path and headers directly.
func (e *Engine) HandleRequest(method, path string, headers map[string]string) (int, string, string) {
	r, _ := http.NewRequest(method, path, nil)
	for k, v := range headers {
		r.Header.Set(k, v)
	}
	return e.handleTemplate(r)
}

// HandleChannelRequest is a test-friendly version for channel API.
func (e *Engine) HandleChannelRequest(method, path string, headers map[string]string) (int, string) {
	r, _ := http.NewRequest(method, path, nil)
	for k, v := range headers {
		r.Header.Set(k, v)
	}
	w := &testResponseWriter{headers: http.Header{}}
	e.ChannelMiddleware.Handle(w, r)
	return w.status, w.body.String()
}

type testResponseWriter struct {
	headers http.Header
	body    strings.Builder
	status  int
}

func (t *testResponseWriter) Header() http.Header         { return t.headers }
func (t *testResponseWriter) Write(b []byte) (int, error)  { return t.body.Write(b) }
func (t *testResponseWriter) WriteHeader(code int)         { t.status = code }

// Utility for formatted error
func init() {
	_ = fmt.Sprintf // ensure fmt is used
}
