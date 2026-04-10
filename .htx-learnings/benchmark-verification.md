# Always Verify Response Content Before Trusting Throughput Numbers

## The Lesson

We reported 6,654 req/sec for single-page renders on a Raspberry Pi. The real number was 850. The inflated number was benchmarking 404 responses (22 bytes) — a stale server process wasn't resolving blog routes after an async adapter code change.

## What Went Wrong

1. The server on port 3001 was started BEFORE the async adapter changes compiled
2. Blog routes returned `<h1>404 Not Found</h1>` (22 bytes) instead of full pages
3. Apache Bench reported 6,654 req/sec — the speed of returning a tiny error string
4. We reported this number without checking what was actually being served

## The Verification Protocol

Before reporting any benchmark number:

```bash
# 1. Check the response is real HTML with correct content
curl -s http://localhost:3001/blog/post-slug | wc -c   # Should be >10KB
curl -s http://localhost:3001/blog/post-slug | grep -c 'expected-title'  # Should be >0

# 2. Check status code
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/blog/post-slug  # Should be 200

# 3. THEN benchmark
ab -n 5000 -c 10 http://localhost:3001/blog/post-slug
```

Also check the `Document Length` field in ab output — if it's tiny (22 bytes), you're benchmarking an error page.

## The Real Numbers (Verified)

| Endpoint | Response Size | Req/sec | Verified |
|----------|--------------|---------|----------|
| Blog post (1 query) | 25,877b | 850 | Title, body, layout present |
| Home page (3 queries) | 24,226b | 859 | Feature cards, blog section present |
| Doc + sidebar (5 queries) | 29,477b | 81 | Sidebar nav groups, doc body present |

## Why This Matters

850 req/sec is genuinely impressive for a Pi 5 serving full pages from a million-row database. The honest number tells a better story than the inflated one — because it's real, it's defensible, and it points to where optimization matters (template rendering, not database lookups).
