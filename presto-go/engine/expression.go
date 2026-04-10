package engine

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
)

var (
	reHtxVTag   = regexp.MustCompile(`<htx:v(\s+raw)?(?:\s+path\s*=\s*"([^"]*)")?\s*(?:/>|>([\s\S]*?)</htx:v>)`)
	reHtxAttr   = regexp.MustCompile(`\{htx:([^}]+)\}`)
	reScriptPro = regexp.MustCompile(`(?i)<script(\s[^>]*)?>[\s\S]*?</script>`)
	reRawPro    = regexp.MustCompile(`(?i)<htx:raw(?:\s[^>]*)?>[\s\S]*?</htx:raw>`)
)

// ExpressionEngine evaluates htx:v and {htx:} expressions.
type ExpressionEngine struct{}

func NewExpressionEngine() *ExpressionEngine {
	return &ExpressionEngine{}
}

// Evaluate processes all expressions in the template.
func (e *ExpressionEngine) Evaluate(template string, data DataContext) string {
	// Step 1: Protect script and raw blocks
	protected := map[string]string{}
	counter := 0

	content := reScriptPro.ReplaceAllStringFunc(template, func(match string) string {
		marker := fmt.Sprintf("<!--PRESTO_PROTECTED_%d-->", counter)
		protected[marker] = match
		counter++
		return marker
	})

	content = reRawPro.ReplaceAllStringFunc(content, func(match string) string {
		marker := fmt.Sprintf("<!--PRESTO_PROTECTED_%d-->", counter)
		protected[marker] = match
		counter++
		return marker
	})

	// Step 2: Evaluate <htx:v> tags
	content = reHtxVTag.ReplaceAllStringFunc(content, func(match string) string {
		sub := reHtxVTag.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		rawFlag := strings.TrimSpace(sub[1]) != ""
		pathAttr := sub[2]
		bodyContent := sub[3]

		expression := strings.TrimSpace(pathAttr)
		if expression == "" {
			expression = strings.TrimSpace(bodyContent)
		}
		if expression == "" {
			return ""
		}

		value := e.ResolveExpression(expression, data)
		str := stringify(value)
		if rawFlag {
			return str
		}
		return EscapeHTML(str)
	})

	// Step 3: Evaluate {htx:expression} attributes
	content = reHtxAttr.ReplaceAllStringFunc(content, func(match string) string {
		sub := reHtxAttr.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		expression := strings.TrimSpace(sub[1])
		value := e.ResolveExpression(expression, data)
		return EscapeHTML(stringify(value))
	})

	// Step 4: Restore protected blocks
	for marker, original := range protected {
		content = strings.Replace(content, marker, original, 1)
	}

	return content
}

// ResolveExpression resolves a single expression with optional pipe.
func (e *ExpressionEngine) ResolveExpression(expression string, data DataContext) interface{} {
	pipeIdx := strings.Index(expression, "|")
	if pipeIdx > 0 {
		path := strings.TrimSpace(expression[:pipeIdx])
		pipeName := strings.TrimSpace(expression[pipeIdx+1:])
		value := ResolvePath(path, data)
		return applyPipe(value, pipeName)
	}
	return ResolvePath(expression, data)
}

// ResolvePath walks a dot-separated path into the data context.
func ResolvePath(path string, data DataContext) interface{} {
	parts := strings.Split(strings.TrimSpace(path), ".")
	var current interface{} = map[string]interface{}(data)

	for _, part := range parts {
		if current == nil {
			return nil
		}
		switch m := current.(type) {
		case map[string]interface{}:
			current = m[part]
		case DataContext:
			current = m[part]
		case Record:
			current = m[part]
		default:
			return nil
		}
	}
	return current
}

func applyPipe(value interface{}, pipeName string) interface{} {
	str := stringify(value)
	switch pipeName {
	case "uppercase":
		return strings.ToUpper(str)
	case "lowercase":
		return strings.ToLower(str)
	case "capitalize":
		if len(str) == 0 {
			return str
		}
		return strings.ToUpper(str[:1]) + str[1:]
	case "trim":
		return strings.TrimSpace(str)
	case "length":
		if arr, ok := value.([]interface{}); ok {
			return len(arr)
		}
		if arr, ok := value.([]Record); ok {
			return len(arr)
		}
		return len(str)
	case "json":
		b, _ := json.Marshal(value)
		return string(b)
	default:
		return value
	}
}

// EscapeHTML escapes &<>".
func EscapeHTML(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, `"`, "&quot;")
	return s
}

// HasExpressions checks if template has unresolved expressions outside of script/raw blocks.
func HasExpressions(template string) bool {
	stripped := reScriptPro.ReplaceAllString(template, "")
	stripped = reRawPro.ReplaceAllString(stripped, "")
	return reHtxVTag.MatchString(stripped) || reHtxAttr.MatchString(stripped)
}

// IsTruthy implements htxlang truthiness.
func IsTruthy(value interface{}) bool {
	if value == nil {
		return false
	}
	switch v := value.(type) {
	case bool:
		return v
	case int:
		return v != 0
	case int64:
		return v != 0
	case float64:
		return v != 0
	case string:
		return v != ""
	case []interface{}:
		return len(v) > 0
	case []Record:
		return len(v) > 0
	}
	return true
}

func stringify(v interface{}) string {
	if v == nil {
		return ""
	}
	switch val := v.(type) {
	case string:
		return val
	case int:
		return fmt.Sprintf("%d", val)
	case int64:
		return fmt.Sprintf("%d", val)
	case float64:
		if val == float64(int64(val)) {
			return fmt.Sprintf("%d", int64(val))
		}
		return fmt.Sprintf("%g", val)
	case bool:
		if val {
			return "true"
		}
		return "false"
	default:
		return fmt.Sprintf("%v", val)
	}
}
