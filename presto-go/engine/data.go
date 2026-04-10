package engine

import (
	"regexp"
	"strconv"
	"strings"
)

var (
	reData     = regexp.MustCompile(`<htx:data\s+([^>]*)/>`)
	reDataRef  = regexp.MustCompile(`\{([^}]+)\}`)
	reDataAttr = regexp.MustCompile(`(\w+)\s*=\s*"([^"]*)"`)
)

// DataResolver processes <htx:data> directives.
type DataResolver struct{}

func NewDataResolver() *DataResolver {
	return &DataResolver{}
}

// Resolve processes data directives and enriches the data context.
func (dr *DataResolver) Resolve(content string, data DataContext, adapter ContentAdapter) (string, DataContext) {
	if adapter == nil {
		cleaned := reData.ReplaceAllString(content, "")
		return cleaned, data
	}

	enriched := data.Copy()

	matches := reData.FindAllStringSubmatch(content, -1)
	for _, m := range matches {
		attrs := parseDataAttrs(m[1])
		typeName := attrs["type"]
		asName := attrs["as"]
		if typeName == "" || asName == "" {
			continue
		}

		slug := resolveReferences(attrs["slug"], data)
		where := resolveReferences(attrs["where"], data)
		order := attrs["order"]
		limit, _ := strconv.Atoi(attrs["limit"])
		offset, _ := strconv.Atoi(attrs["offset"])

		if slug != "" {
			record, err := adapter.Get(typeName, map[string]string{"slug": slug})
			if err == nil && record != nil {
				enriched[asName] = record
			}
		} else {
			records, err := adapter.Query(QueryOpts{
				Type:   typeName,
				Where:  where,
				Order:  order,
				Limit:  limit,
				Offset: offset,
			})
			if err == nil {
				enriched[asName] = records
			}
		}
	}

	cleaned := reData.ReplaceAllString(content, "")
	return cleaned, enriched
}

func parseDataAttrs(s string) map[string]string {
	attrs := map[string]string{}
	matches := reDataAttr.FindAllStringSubmatch(s, -1)
	for _, m := range matches {
		attrs[m[1]] = m[2]
	}
	return attrs
}

func resolveReferences(value string, data DataContext) string {
	if value == "" {
		return ""
	}
	return reDataRef.ReplaceAllStringFunc(value, func(match string) string {
		sub := reDataRef.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		path := strings.TrimSpace(sub[1])
		val := ResolvePath(path, data)
		return stringify(val)
	})
}
