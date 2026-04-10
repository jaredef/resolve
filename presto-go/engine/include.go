package engine

import (
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var reInclude = regexp.MustCompile(`<htx:include\s+src\s*=\s*"([^"]+)"\s*/>`)

// IncludeResolver expands <htx:include> directives.
type IncludeResolver struct {
	TemplateDir string
}

func NewIncludeResolver(templateDir string) *IncludeResolver {
	return &IncludeResolver{TemplateDir: templateDir}
}

// Expand recursively expands includes.
func (ir *IncludeResolver) Expand(content, filePath string, depth int) string {
	if depth > 10 {
		return content
	}

	return reInclude.ReplaceAllStringFunc(content, func(match string) string {
		sub := reInclude.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		src := sub[1]

		resolved := ir.resolvePath(src, filePath)
		if resolved == "" {
			return "<!-- include not found: " + src + " -->"
		}

		data, err := os.ReadFile(resolved)
		if err != nil {
			return "<!-- include not found: " + src + " -->"
		}

		return ir.Expand(string(data), resolved, depth+1)
	})
}

func (ir *IncludeResolver) resolvePath(src, fromFile string) string {
	if strings.HasPrefix(src, "/") {
		candidate := filepath.Join(ir.TemplateDir, strings.TrimPrefix(src, "/"))
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

	candidate = filepath.Join(ir.TemplateDir, src)
	if isFile(candidate) {
		return candidate
	}

	return ""
}
