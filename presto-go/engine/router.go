package engine

import (
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var reDynSegment = regexp.MustCompile(`^\[([^\]]+)\](\.htx)?$`)

// Router maps URL paths to template files.
type Router struct {
	TemplateDir string
}

func NewRouter(templateDir string) *Router {
	return &Router{TemplateDir: templateDir}
}

// Resolve finds the template file for a given request path.
func (r *Router) Resolve(requestPath string) *RouteMatch {
	normalized := requestPath
	if normalized == "/" {
		normalized = "/index"
	}
	normalized = strings.TrimRight(normalized, "/")

	// Step 1: Exact file match
	candidate := filepath.Join(r.TemplateDir, normalized+".htx")
	if isFile(candidate) {
		return &RouteMatch{FilePath: candidate, Params: map[string]string{}}
	}

	// Step 2: Directory index
	candidate = filepath.Join(r.TemplateDir, normalized, "index.htx")
	if isFile(candidate) {
		return &RouteMatch{FilePath: candidate, Params: map[string]string{}}
	}

	// Step 3: Dynamic segment resolution
	segments := splitSegments(normalized)
	return r.walkDynamic(r.TemplateDir, segments, 0, map[string]string{})
}

func (r *Router) walkDynamic(dir string, segments []string, index int, params map[string]string) *RouteMatch {
	if index >= len(segments) {
		indexFile := filepath.Join(dir, "index.htx")
		if isFile(indexFile) {
			return &RouteMatch{FilePath: indexFile, Params: copyParams(params)}
		}
		return nil
	}

	segment := segments[index]
	isLast := index == len(segments)-1

	// Try exact match
	if isLast {
		exactFile := filepath.Join(dir, segment+".htx")
		if isFile(exactFile) {
			return &RouteMatch{FilePath: exactFile, Params: copyParams(params)}
		}
	}

	exactDir := filepath.Join(dir, segment)
	if isDir(exactDir) {
		result := r.walkDynamic(exactDir, segments, index+1, params)
		if result != nil {
			return result
		}
	}

	// Try dynamic segment [paramName]
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil
	}

	for _, entry := range entries {
		name := entry.Name()
		match := reDynSegment.FindStringSubmatch(name)
		if match == nil {
			continue
		}

		paramName := match[1]
		isDynFile := strings.HasSuffix(name, ".htx")

		if isDynFile && isLast {
			newParams := copyParams(params)
			newParams[paramName] = segment
			return &RouteMatch{
				FilePath: filepath.Join(dir, name),
				Params:   newParams,
			}
		}

		if !isDynFile && entry.IsDir() {
			newParams := copyParams(params)
			newParams[paramName] = segment
			result := r.walkDynamic(filepath.Join(dir, name), segments, index+1, newParams)
			if result != nil {
				return result
			}
		}
	}

	return nil
}

func splitSegments(path string) []string {
	parts := strings.Split(path, "/")
	var out []string
	for _, p := range parts {
		if p != "" {
			out = append(out, p)
		}
	}
	return out
}

func copyParams(p map[string]string) map[string]string {
	out := make(map[string]string, len(p))
	for k, v := range p {
		out[k] = v
	}
	return out
}

func isFile(path string) bool {
	info, err := os.Stat(path)
	return err == nil && !info.IsDir()
}

func isDir(path string) bool {
	info, err := os.Stat(path)
	return err == nil && info.IsDir()
}
