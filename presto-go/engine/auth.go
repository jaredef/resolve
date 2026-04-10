package engine

import (
	"regexp"
)

var (
	reAuth   = regexp.MustCompile(`<htx:auth(?:\s+role="([^"]*)")?\s*>([\s\S]*?)</htx:auth>`)
	reUnauth = regexp.MustCompile(`<htx:unauth\s*>([\s\S]*?)</htx:unauth>`)
)

// ResolveAuth processes htx:auth and htx:unauth conditionals.
func ResolveAuth(content string, data DataContext) string {
	auth, _ := data["auth"]
	var authMap map[string]interface{}
	if a, ok := auth.(map[string]interface{}); ok {
		authMap = a
	}

	// htx:auth blocks
	content = reAuth.ReplaceAllStringFunc(content, func(match string) string {
		sub := reAuth.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		role := sub[1]
		body := sub[2]

		if authMap == nil || authMap["user"] == nil {
			return ""
		}

		if role != "" {
			user, ok := authMap["user"].(map[string]interface{})
			if !ok {
				return ""
			}
			if userRole, _ := user["role"].(string); userRole != role {
				return ""
			}
		}

		return body
	})

	// htx:unauth blocks
	content = reUnauth.ReplaceAllStringFunc(content, func(match string) string {
		sub := reUnauth.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		body := sub[1]

		if authMap != nil && authMap["user"] != nil {
			return ""
		}
		return body
	})

	return content
}
