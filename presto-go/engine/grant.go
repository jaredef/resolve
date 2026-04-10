package engine

import (
	"regexp"
	"time"
)

var reGrant = regexp.MustCompile(`<htx:grant\s+([^>]*)/>`)

// GrantResolver materializes <htx:grant> credentials.
type GrantResolver struct {
	TokenService *TokenService
}

func NewGrantResolver(ts *TokenService) *GrantResolver {
	return &GrantResolver{TokenService: ts}
}

// Resolve processes grant directives.
func (gr *GrantResolver) Resolve(content string, data DataContext, userId string) (string, DataContext) {
	enriched := data.Copy()

	matches := reGrant.FindAllStringSubmatch(content, -1)
	for _, m := range matches {
		attrs := parseDataAttrs(m[1])
		grantType := attrs["type"]
		varName := attrs["as"]
		if grantType == "" || varName == "" {
			continue
		}

		switch grantType {
		case "websocket":
			token, _ := gr.TokenService.SignToken(map[string]interface{}{
				"sub":   userId,
				"scope": "websocket",
				"exp":   time.Now().UnixMilli() + 120000,
				"jti":   time.Now().UnixNano(),
			})
			enriched[varName] = map[string]interface{}{
				"token":     token,
				"expiresAt": time.Now().UnixMilli() + 120000,
			}

		case "channel":
			moduleName := attrs["module"]
			scope := "channel:" + moduleName
			token, _ := gr.TokenService.SignToken(map[string]interface{}{
				"sub":   userId,
				"scope": scope,
				"exp":   time.Now().UnixMilli() + 120000,
				"jti":   time.Now().UnixNano(),
			})
			enriched[varName] = map[string]interface{}{
				"token":     token,
				"module":    moduleName,
				"scope":     scope,
				"expiresAt": time.Now().UnixMilli() + 120000,
			}

		case "asset":
			path := attrs["path"]
			signedURL := gr.TokenService.SignURL(path, 3600000)
			enriched[varName] = map[string]interface{}{
				"url":       signedURL,
				"path":      path,
				"expiresAt": time.Now().UnixMilli() + 3600000,
			}
		}
	}

	cleaned := reGrant.ReplaceAllString(content, "")
	return cleaned, enriched
}
