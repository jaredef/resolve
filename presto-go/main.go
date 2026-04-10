package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/hypermediacms/presto-go/engine"
)

func main() {
	dir, _ := os.Getwd()
	templateDir := filepath.Join(dir, "templates")
	publicDir := filepath.Join(dir, "public")
	dbPath := filepath.Join(dir, "data.db")

	adapter, err := engine.NewSQLiteAdapter(dbPath)
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	defer adapter.Close()

	// Seed some demo content
	seedDemoContent(adapter)

	e := engine.NewEngine(engine.EngineConfig{
		TemplateDir: templateDir,
		PublicDir:   publicDir,
		Secret:      "presto-go-secret-key-change-in-production",
		Adapter:     adapter,
	})

	port := "4001"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}

	fmt.Printf("PRESTO Go listening on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, e))
}

func seedDemoContent(adapter *engine.SQLiteAdapter) {
	// Check if already seeded
	records, _ := adapter.Query(engine.QueryOpts{Type: "page", Limit: 1})
	if len(records) > 0 {
		return
	}

	pages := []map[string]interface{}{
		{"slug": "getting-started", "title": "Getting Started", "body": "Welcome to PRESTO Go.", "status": "published", "section": "docs", "sort_order": 1},
		{"slug": "routing", "title": "Routing", "body": "File-based routing with dynamic segments.", "status": "published", "section": "docs", "sort_order": 2},
		{"slug": "templates", "title": "Templates", "body": "HTX templates with directives.", "status": "published", "section": "docs", "sort_order": 3},
	}

	for _, p := range pages {
		adapter.Create("page", p)
	}
}
