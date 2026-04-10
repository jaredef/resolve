We built an e-commerce store with 1 million products in a single SQLite database on a Raspberry Pi 5. The product detail page rendered in 14 milliseconds. Then we added a JSON index and the raw query dropped to 0.04 milliseconds — 865 times faster. Here is how SQLite indexes work, why JSON indexes are different, and what happened when we pushed to a million rows.

## The Problem: N+1 Relational Queries

The HTX template engine resolves parent-child relationships using the htx:rel directive. A collection page shows categories, and each category shows its products. The engine queries products WHERE category_id matches the parent category's ID.

The product data lives in SQLite's content table. Each row has a type column (indexed) and a meta column containing JSON with fields like category_id, price, and summary. The htx:rel query translates to:

    SELECT * FROM content
    WHERE type = 'store-product'
    AND json_extract(meta, '$.category_id') = '12345'

Without an index on the JSON field, SQLite does this: find all rows where type = 'store-product' (using the type index), then scan every one of those rows, parse the JSON in the meta column, extract the category_id field, and compare it. At 10,000 products, each query scans 10,000 rows. At 1 million, each query scans 1 million.

## How SQLite Indexes Work

A B-tree index is a sorted data structure that maps values to row IDs. When you create an index on a column, SQLite builds a tree where each node contains sorted values and pointers to child nodes. Looking up a value traverses the tree from root to leaf — the depth is logarithmic. A million-row table has a tree about 20 levels deep. Finding one row means 20 comparisons instead of 1,000,000.

The existing indexes on the content table:

    CREATE INDEX idx_content_type ON content(type);
    CREATE INDEX idx_content_slug ON content(type, slug);
    CREATE INDEX idx_content_type_status ON content(type, status);

These cover the common queries: find all rows of a type, find a row by type and slug, filter by type and status. But none of them help with json_extract — the JSON field inside the meta column.

## JSON Indexes: Indexing Into a Text Column

SQLite supports indexes on expressions, not just columns. You can index the result of a function call:

    CREATE INDEX idx_store_product_category
    ON content(type, json_extract(meta, '$.category_id'))
    WHERE type = 'store-product';

This tells SQLite: for every row where type is 'store-product', evaluate json_extract(meta, '$.category_id'), and store the result in a B-tree. The WHERE clause is a partial index — it only indexes products, not documentation or blog posts. This keeps the index small and focused.

After creating this index, the query plan changes:

    Before: SEARCH content USING INDEX idx_content_type (type=?)
    After:  SEARCH content USING INDEX idx_store_product_category (type=? AND <expr>=?)

The first plan finds all products by type, then scans them. The second plan jumps directly to products with the matching category_id. The difference at 1 million rows: 34.62 milliseconds vs 0.04 milliseconds.

## Memory-Mapped I/O

SQLite accesses the database file through memory-mapped I/O (mmap). Instead of reading pages from disk into a buffer, the operating system maps the file directly into the process's virtual address space. When SQLite reads a page, the OS loads it from disk on first access (a page fault), then serves subsequent reads from memory.

For a 6MB database (10,000 products), the entire file fits in RAM. Page faults happen once at startup; after that, every read is a memory access.

For a 461MB database (1 million products), the file exceeds what the OS wants to keep in memory on a Pi with 8GB RAM. Pages get evicted under memory pressure. When SQLite traverses the B-tree index, each level might trigger a page fault — a disk read that takes microseconds instead of nanoseconds.

This is why the Pi's CPU hit 98% with 1 million rows. The Bun process memory-mapped the entire 461MB file (71GB virtual address space due to SQLite's mmap overhead). The OS was constantly paging data in and out. Every query, even fast indexed ones, competed for physical memory with the rest of the system.

## The Index Solved Queries, Not Memory

The JSON index made individual queries 865x faster. But the total page render time was bottlenecked by the template engine, not the database. At 10,000 products:

    Database query time per product page: 0.03ms
    Template engine time per product page: 26ms
    Total: ~26ms

The database could serve 31,611 product pages per second. The template engine could do 38. The index eliminated the database as a bottleneck — but the template engine was always the real ceiling.

At 1 million products, the index kept queries at 0.04ms. But the memory-mapped 461MB file caused system-wide slowdown from page faults. The solution was not a better index — it was reducing the working set to fit in memory.

## The Module Pattern: Bypassing the Template Engine

The template engine's cost comes from parsing HTX blocks, evaluating expressions, resolving htx:rel directives, and hydrating placeholders. For a product page with related products, that is: parse the template, discover the htx:rel block, query related products, iterate and hydrate each result, compose the layout.

The module system bypasses this entirely. A context provider runs raw SQL with the JSON index, assembles the data, and injects it into the template as pre-computed values. The template uses simple expressions — no query blocks, no htx:rel, no nested parsing.

The result at 1 million products:

    htx:rel approach (10K products): 51 req/sec
    Context provider approach (1M products): 796 req/sec

The context provider is 15.6x faster and handles 100x more data. The JSON index makes the raw queries fast; the module pattern eliminates the template engine overhead.

## What We Learned

1. JSON indexes in SQLite are real indexes. They use the same B-tree structure as column indexes. The partial index (WHERE type = 'store-product') keeps them focused. Create them for any json_extract pattern you query repeatedly.

2. Memory-mapped I/O is the scaling constraint on small hardware. A 6MB database is free — it lives in RAM. A 461MB database fights for memory with everything else on the system. The fix is not more RAM; it is keeping the working set small or using the module pattern to make fewer, more targeted queries.

3. The database is not the bottleneck. At 0.03ms per indexed query, SQLite can serve tens of thousands of requests per second. The template engine — parsing, expression evaluation, hydration — is where the time goes. When template queries are too slow, move the data assembly into a context provider.

4. Indexes do not help if you scan the results. The SQLite adapter's query method runs a COUNT to get the total number of matching rows. At 1 million products, this COUNT scans the full result set even with an index. The raw SQL in the context provider skips the COUNT entirely — it only fetches the rows it needs.
