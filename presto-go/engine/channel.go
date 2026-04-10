package engine

import (
	"encoding/json"
	"net/http"
	"strings"
)

// ChannelMiddleware validates Bearer tokens on /api/channel/ routes.
type ChannelMiddleware struct {
	Registry     *ModuleRegistry
	TokenService *TokenService
}

func NewChannelMiddleware(registry *ModuleRegistry, ts *TokenService) *ChannelMiddleware {
	return &ChannelMiddleware{Registry: registry, TokenService: ts}
}

// Handle processes a channel API request.
func (cm *ChannelMiddleware) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse: /api/channel/{module}/{subPath}
	path := strings.TrimPrefix(r.URL.Path, "/api/channel/")
	parts := strings.SplitN(path, "/", 2)
	moduleName := parts[0]
	subPath := ""
	if len(parts) > 1 {
		subPath = parts[1]
	}

	// Find handler
	handler := cm.Registry.GetChannelHandler(moduleName)
	if handler == nil {
		w.WriteHeader(404)
		json.NewEncoder(w).Encode(map[string]string{"error": "Unknown channel"})
		return
	}

	// Validate Bearer token
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		w.WriteHeader(401)
		json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
		return
	}

	token := strings.TrimPrefix(authHeader, "Bearer ")
	payload, err := cm.TokenService.VerifyToken(token)
	if err != nil {
		w.WriteHeader(401)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid or expired token"})
		return
	}

	// Verify scope
	expectedScope := "channel:" + moduleName
	if scope, _ := payload["scope"].(string); scope != expectedScope {
		w.WriteHeader(403)
		json.NewEncoder(w).Encode(map[string]string{"error": "Token scope mismatch"})
		return
	}

	userId, _ := payload["sub"].(string)

	// Parse query params
	query := map[string]string{}
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			query[k] = v[0]
		}
	}

	// Parse body
	var body map[string]interface{}
	if r.Body != nil {
		json.NewDecoder(r.Body).Decode(&body)
	}

	result := handler.Handle(subPath, query, userId, ChannelOpts{
		Method: r.Method,
		Body:   body,
	})

	w.WriteHeader(result.Status)
	json.NewEncoder(w).Encode(result.Data)
}
