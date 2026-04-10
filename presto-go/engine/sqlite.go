package engine

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	_ "modernc.org/sqlite"
)

// SQLiteAdapter implements ContentAdapter using modernc.org/sqlite.
type SQLiteAdapter struct {
	db *sql.DB
}

func NewSQLiteAdapter(dbPath string) (*SQLiteAdapter, error) {
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, err
	}

	// Create default content table
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS content (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		type TEXT NOT NULL,
		slug TEXT,
		title TEXT,
		body TEXT,
		body_html TEXT,
		status TEXT DEFAULT 'published',
		section TEXT,
		sort_order INTEGER DEFAULT 0,
		meta TEXT DEFAULT '{}',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)
	if err != nil {
		return nil, err
	}

	_, _ = db.Exec(`CREATE INDEX IF NOT EXISTS idx_content_type ON content(type)`)
	_, _ = db.Exec(`CREATE INDEX IF NOT EXISTS idx_content_slug ON content(type, slug)`)

	return &SQLiteAdapter{db: db}, nil
}

func (a *SQLiteAdapter) Close() error {
	return a.db.Close()
}

func (a *SQLiteAdapter) Query(opts QueryOpts) ([]Record, error) {
	query := "SELECT * FROM content WHERE type = ?"
	args := []interface{}{opts.Type}

	if opts.Where != "" {
		query += " AND " + opts.Where
	}

	query += " AND status = 'published'"

	if opts.Order != "" {
		query += " ORDER BY " + opts.Order
	} else {
		query += " ORDER BY sort_order ASC, id ASC"
	}

	if opts.Limit > 0 {
		query += fmt.Sprintf(" LIMIT %d", opts.Limit)
	}

	if opts.Offset > 0 {
		query += fmt.Sprintf(" OFFSET %d", opts.Offset)
	}

	return a.queryRows(query, args...)
}

func (a *SQLiteAdapter) Get(typeName string, identifier map[string]string) (Record, error) {
	query := "SELECT * FROM content WHERE type = ?"
	args := []interface{}{typeName}

	if slug, ok := identifier["slug"]; ok {
		query += " AND slug = ?"
		args = append(args, slug)
	} else if id, ok := identifier["id"]; ok {
		query += " AND id = ?"
		args = append(args, id)
	}

	query += " LIMIT 1"

	records, err := a.queryRows(query, args...)
	if err != nil {
		return nil, err
	}
	if len(records) == 0 {
		return nil, nil
	}
	return records[0], nil
}

func (a *SQLiteAdapter) Create(typeName string, data map[string]interface{}) (Record, error) {
	cols := []string{"type"}
	placeholders := []string{"?"}
	args := []interface{}{typeName}

	for _, col := range []string{"slug", "title", "body", "body_html", "status", "section", "meta"} {
		if v, ok := data[col]; ok {
			cols = append(cols, col)
			placeholders = append(placeholders, "?")
			if col == "meta" {
				b, _ := json.Marshal(v)
				args = append(args, string(b))
			} else {
				args = append(args, v)
			}
		}
	}

	if v, ok := data["sort_order"]; ok {
		cols = append(cols, "sort_order")
		placeholders = append(placeholders, "?")
		args = append(args, v)
	}

	query := fmt.Sprintf("INSERT INTO content (%s) VALUES (%s)",
		strings.Join(cols, ", "), strings.Join(placeholders, ", "))

	result, err := a.db.Exec(query, args...)
	if err != nil {
		return nil, err
	}

	id, _ := result.LastInsertId()
	return a.Get(typeName, map[string]string{"id": fmt.Sprintf("%d", id)})
}

func (a *SQLiteAdapter) Update(typeName string, id string, data map[string]interface{}) (bool, error) {
	sets := []string{}
	args := []interface{}{}

	for _, col := range []string{"slug", "title", "body", "body_html", "status", "section", "meta"} {
		if v, ok := data[col]; ok {
			sets = append(sets, col+" = ?")
			if col == "meta" {
				b, _ := json.Marshal(v)
				args = append(args, string(b))
			} else {
				args = append(args, v)
			}
		}
	}

	if len(sets) == 0 {
		return false, nil
	}

	sets = append(sets, "updated_at = CURRENT_TIMESTAMP")
	args = append(args, typeName, id)

	query := fmt.Sprintf("UPDATE content SET %s WHERE type = ? AND id = ?", strings.Join(sets, ", "))
	result, err := a.db.Exec(query, args...)
	if err != nil {
		return false, err
	}

	rows, _ := result.RowsAffected()
	return rows > 0, nil
}

func (a *SQLiteAdapter) Delete(typeName string, id string) (bool, error) {
	result, err := a.db.Exec("DELETE FROM content WHERE type = ? AND id = ?", typeName, id)
	if err != nil {
		return false, err
	}
	rows, _ := result.RowsAffected()
	return rows > 0, nil
}

func (a *SQLiteAdapter) queryRows(query string, args ...interface{}) ([]Record, error) {
	rows, err := a.db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var records []Record
	for rows.Next() {
		values := make([]interface{}, len(cols))
		pointers := make([]interface{}, len(cols))
		for i := range values {
			pointers[i] = &values[i]
		}

		if err := rows.Scan(pointers...); err != nil {
			return nil, err
		}

		record := make(Record)
		for i, col := range cols {
			val := values[i]
			// Convert []byte to string
			if b, ok := val.([]byte); ok {
				val = string(b)
			}
			record[col] = val
		}
		records = append(records, record)
	}

	return records, nil
}
