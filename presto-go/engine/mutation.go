package engine

import (
	"regexp"
	"time"
)

var reAction = regexp.MustCompile(`<htx:action\s+([^>]*)/>`)

// MutationHandler generates and verifies action tokens.
type MutationHandler struct {
	TokenService *TokenService
}

func NewMutationHandler(ts *TokenService) *MutationHandler {
	return &MutationHandler{TokenService: ts}
}

// Prepare generates tokens for htx:action directives.
func (mh *MutationHandler) Prepare(content string, data DataContext) (string, DataContext) {
	enriched := data.Copy()
	actions := map[string]interface{}{}

	matches := reAction.FindAllStringSubmatch(content, -1)
	for _, m := range matches {
		attrs := parseDataAttrs(m[1])
		name := attrs["name"]
		typeName := attrs["type"]
		record := resolveReferences(attrs["record"], data)

		payload := map[string]interface{}{
			"action":   name,
			"type":     typeName,
			"recordId": record,
			"exp":      time.Now().UnixMilli() + 3600000,
		}

		token, err := mh.TokenService.SignToken(payload)
		if err != nil {
			continue
		}
		actions[name] = token
	}

	enriched["$actions"] = actions
	cleaned := reAction.ReplaceAllString(content, "")
	return cleaned, enriched
}

// Execute verifies a mutation token and returns the payload.
func (mh *MutationHandler) Execute(token string) (map[string]interface{}, error) {
	return mh.TokenService.VerifyToken(token)
}
