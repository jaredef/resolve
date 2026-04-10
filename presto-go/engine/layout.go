package engine

import (
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var reLayout = regexp.MustCompile(`(?i)<htx:layout(?:\s+(?:src\s*=\s*"([^"]*)"|(none)))?\s*(?:/>|></htx:layout>)`)

// LayoutResolver wraps content in layout templates.
type LayoutResolver struct {
	TemplateDir string
}

func NewLayoutResolver(templateDir string) *LayoutResolver {
	return &LayoutResolver{TemplateDir: templateDir}
}

type layoutDirective struct {
	none         bool
	src          string
	cleanContent string
}

func extractLayoutDirective(content string) layoutDirective {
	match := reLayout.FindStringSubmatch(content)
	if match == nil {
		return layoutDirective{cleanContent: content}
	}

	clean := reLayout.ReplaceAllString(content, "")
	if match[2] == "none" {
		return layoutDirective{none: true, cleanContent: clean}
	}
	if match[1] != "" {
		return layoutDirective{src: match[1], cleanContent: clean}
	}
	return layoutDirective{cleanContent: clean}
}

// Wrap applies layout wrapping to content (extracts directive from content).
func (lr *LayoutResolver) Wrap(content, filePath string, skipRoot bool) string {
	directive := extractLayoutDirective(content)
	return lr.WrapWithDirective(directive.cleanContent, filePath, skipRoot, directive.none, directive.src)
}

// WrapWithDirective applies layout wrapping with pre-extracted directive info.
func (lr *LayoutResolver) WrapWithDirective(content, filePath string, skipRoot bool, none bool, src string) string {
	if none {
		return content
	}

	if src != "" {
		return lr.wrapExplicit(content, src, skipRoot)
	}

	// Convention walk
	layouts := lr.collectLayouts(filePath)

	if skipRoot && len(layouts) > 0 {
		lastPath := layouts[len(layouts)-1]
		lastContent, err := os.ReadFile(lastPath)
		if err == nil && strings.Contains(strings.ToLower(string(lastContent)), "<!doctype html") {
			layouts = layouts[:len(layouts)-1]
		}
	}

	output := content
	for _, layoutPath := range layouts {
		layoutContent, err := os.ReadFile(layoutPath)
		if err != nil {
			continue
		}
		output = strings.ReplaceAll(string(layoutContent), "__content__", output)
	}

	return output
}

func (lr *LayoutResolver) wrapExplicit(content, src string, skipRoot bool) string {
	layoutPath := filepath.Join(lr.TemplateDir, src)
	if !isFile(layoutPath) {
		return content
	}

	layoutContent, err := os.ReadFile(layoutPath)
	if err != nil {
		return content
	}

	return strings.ReplaceAll(string(layoutContent), "__content__", content)
}

func (lr *LayoutResolver) collectLayouts(filePath string) []string {
	resolvedRoot, _ := filepath.Abs(lr.TemplateDir)
	currentDir := filepath.Dir(filePath)
	if !filepath.IsAbs(currentDir) {
		currentDir, _ = filepath.Abs(currentDir)
	}

	var layouts []string
	for {
		layoutFile := filepath.Join(currentDir, "_layout.htx")
		if isFile(layoutFile) {
			data, err := os.ReadFile(layoutFile)
			if err == nil {
				layouts = append(layouts, layoutFile)
				if strings.Contains(strings.ToLower(string(data)), "<!doctype html") {
					break
				}
			}
		}

		if currentDir == resolvedRoot {
			break
		}

		parent := filepath.Dir(currentDir)
		if parent == currentDir {
			break
		}
		currentDir = parent
	}

	return layouts
}
