package engine

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	reEach  = regexp.MustCompile(`<htx:each\s+items="([^"]+)"\s+as="([^"]+)"\s*>([\s\S]*?)</htx:each>`)
	reEmpty = regexp.MustCompile(`<htx:empty\s*/?>`)
	reIf    = regexp.MustCompile(`<htx:if\s+test="([^"]+)"\s*>([\s\S]*?)</htx:if>(?:\s*<htx:else\s*>([\s\S]*?)</htx:else>)?`)
)

// ControlFlow processes htx:each and htx:if directives.
type ControlFlow struct {
	Expression *ExpressionEngine
}

func NewControlFlow(expr *ExpressionEngine) *ControlFlow {
	return &ControlFlow{Expression: expr}
}

// Resolve processes all control flow directives.
func (cf *ControlFlow) Resolve(content string, data DataContext) string {
	content = cf.resolveEach(content, data)
	content = cf.resolveIf(content, data)
	return content
}

func (cf *ControlFlow) resolveEach(content string, data DataContext) string {
	return reEach.ReplaceAllStringFunc(content, func(match string) string {
		sub := reEach.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		itemsPath := strings.TrimSpace(sub[1])
		asVar := sub[2]
		body := sub[3]

		itemsRaw := ResolvePath(itemsPath, data)
		items := toSlice(itemsRaw)

		if len(items) == 0 {
			parts := reEmpty.Split(body, 2)
			if len(parts) > 1 {
				return parts[1]
			}
			return ""
		}

		itemTemplate := reEmpty.Split(body, 2)[0]
		var result strings.Builder

		for i, item := range items {
			itemData := data.Copy()
			itemData[asVar] = item
			itemData["$index"] = i
			itemData["$first"] = i == 0
			itemData["$last"] = i == len(items)-1

			rendered := cf.Expression.Evaluate(itemTemplate, itemData)
			rendered = cf.resolveEach(rendered, itemData)
			rendered = cf.resolveIf(rendered, itemData)
			result.WriteString(rendered)
		}

		return result.String()
	})
}

func (cf *ControlFlow) resolveIf(content string, data DataContext) string {
	return reIf.ReplaceAllStringFunc(content, func(match string) string {
		sub := reIf.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		test := strings.TrimSpace(sub[1])
		ifContent := sub[2]
		elseContent := sub[3]

		value := ResolvePath(test, data)
		if IsTruthy(value) {
			return cf.Expression.Evaluate(ifContent, data)
		}
		if elseContent != "" {
			return cf.Expression.Evaluate(elseContent, data)
		}
		return ""
	})
}

func toSlice(v interface{}) []interface{} {
	if v == nil {
		return nil
	}
	switch items := v.(type) {
	case []interface{}:
		return items
	case []Record:
		out := make([]interface{}, len(items))
		for i, r := range items {
			out[i] = map[string]interface{}(r)
		}
		return out
	case []map[string]interface{}:
		out := make([]interface{}, len(items))
		for i, r := range items {
			out[i] = r
		}
		return out
	default:
		_ = fmt.Sprintf("%T", v) // debug aid
		return nil
	}
}
