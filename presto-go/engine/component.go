package engine

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var (
	reComponent    = regexp.MustCompile(`<htx:component\s+src\s*=\s*"([^"]+)"([^>]*)(?:/>|>([\s\S]*?)</htx:component>)`)
	reProps        = regexp.MustCompile(`<htx:props>([\s\S]*?)</htx:props>`)
	reHtxScript    = regexp.MustCompile(`<htx:script>([\s\S]*?)</htx:script>`)
	reAttrPair     = regexp.MustCompile(`(\w+)\s*=\s*"([^"]*)"`)
	reFirstOpenTag = regexp.MustCompile(`^(\s*<[a-zA-Z][a-zA-Z0-9]*)`)
	reSlotTag      = regexp.MustCompile(`<htx:slot\s*/>|<htx:slot></htx:slot>`)
)

// ComponentResolver expands <htx:component> directives.
type ComponentResolver struct {
	TemplateDir string
}

func NewComponentResolver(templateDir string) *ComponentResolver {
	return &ComponentResolver{TemplateDir: templateDir}
}

// Resolve processes all component tags.
func (cr *ComponentResolver) Resolve(content string, data DataContext, depth int, scriptCollector *[]string, sourceFile string) string {
	if depth > 10 {
		return content
	}

	return reComponent.ReplaceAllStringFunc(content, func(match string) string {
		sub := reComponent.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		src := sub[1]
		attrsStr := sub[2]
		slotContent := sub[3]

		componentPath := cr.resolvePath(src, sourceFile)
		if componentPath == "" {
			return "<!-- component not found: " + src + " -->"
		}

		data, err := os.ReadFile(componentPath)
		if err != nil {
			return "<!-- component not found: " + src + " -->"
		}
		template := string(data)

		// Parse declared props with defaults
		declaredProps := parsePropsBlock(template)
		template = reProps.ReplaceAllString(template, "")

		// Parse passed props from attributes
		passedProps := parseAttributes(attrsStr)

		// Merge: passed overrides declared
		for k, v := range passedProps {
			declaredProps[k] = v
		}

		// Substitute {{ propName }} in template
		for key, value := range declaredProps {
			template = strings.ReplaceAll(template, "{{ "+key+" }}", value)
			template = strings.ReplaceAll(template, "{{"+key+"}}", value)
		}

		// Inject slot content
		if slotContent != "" {
			template = reSlotTag.ReplaceAllString(template, slotContent)
		}

		// Extract scripts
		if reHtxScript.MatchString(template) {
			bodies := extractScriptBodies(template)
			template = reHtxScript.ReplaceAllString(template, "")

			if len(bodies) > 0 {
				id := fmt.Sprintf("htx-c%d", len(*scriptCollector))
				template = addDataHtxId(template, id)
				combined := strings.Join(bodies, "\n  ")
				iife := fmt.Sprintf(
					"(function(){\n  const el = document.querySelector('[data-htx-id=\"%s\"]');\n  if (!el) return;\n  %s\n})();",
					id, combined,
				)
				*scriptCollector = append(*scriptCollector, iife)
			}
		}

		// Recurse for nested components
		return cr.Resolve(template, DataContext{}, depth+1, scriptCollector, componentPath)
	})
}

func parsePropsBlock(template string) map[string]string {
	match := reProps.FindStringSubmatch(template)
	if match == nil {
		return map[string]string{}
	}

	props := map[string]string{}
	lines := strings.Split(match[1], "\n")
	reQuoted := regexp.MustCompile(`^\s*(\w+)\s*=\s*"([^"]*)"\s*$`)
	reUnquoted := regexp.MustCompile(`^\s*(\w+)\s*=\s*(.*?)\s*$`)

	for _, line := range lines {
		if m := reQuoted.FindStringSubmatch(line); m != nil {
			props[m[1]] = m[2]
			continue
		}
		if m := reUnquoted.FindStringSubmatch(line); m != nil {
			props[m[1]] = m[2]
		}
	}
	return props
}

func parseAttributes(attrsStr string) map[string]string {
	attrs := map[string]string{}
	matches := reAttrPair.FindAllStringSubmatch(attrsStr, -1)
	for _, m := range matches {
		if m[1] != "src" {
			attrs[m[1]] = m[2]
		}
	}
	return attrs
}

func extractScriptBodies(template string) []string {
	matches := reHtxScript.FindAllStringSubmatch(template, -1)
	var bodies []string
	for _, m := range matches {
		bodies = append(bodies, strings.TrimSpace(m[1]))
	}
	return bodies
}

func addDataHtxId(html, id string) string {
	return reFirstOpenTag.ReplaceAllString(html, fmt.Sprintf(`$1 data-htx-id="%s"`, id))
}

func (cr *ComponentResolver) resolvePath(src, fromFile string) string {
	if strings.HasPrefix(src, "/") {
		candidate := filepath.Join(cr.TemplateDir, strings.TrimPrefix(src, "/"))
		if isFile(candidate) {
			return candidate
		}
		return ""
	}

	if strings.Contains(src, "..") {
		return ""
	}

	candidate := filepath.Join(filepath.Dir(fromFile), src)
	if isFile(candidate) {
		return candidate
	}

	candidate = filepath.Join(cr.TemplateDir, src)
	if isFile(candidate) {
		return candidate
	}

	return ""
}
