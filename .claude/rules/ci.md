# CI/CD Rules

## Lighthouse CI Workflow

File: `.github/workflows/lighthouse.yml`

### Architecture
3-job pipeline:
1. **build**: checkout, pnpm install, astro build, upload dist/ artifact
2. **lighthouse** (matrix: [desktop, mobile]): download artifact, serve locally, collect scores, assert thresholds, generate report
3. **comment** (PR only): combine desktop+mobile reports, post sticky PR comment

### URL Strategy
- **Pull requests**: 8 representative URLs (/, /about, /search, /tags, /posts, + 3 article pages)
- **Push to main**: Full scan of all pages discovered from dist/ build output

### Representative PR URLs
```
/
/about
/search
/tags
/posts
/posts/synology-nas-teslamate-guide
/posts/where-vim-came-from
/posts/modern-cpp-lambda-features
```

These were chosen to cover: homepage, static pages, listing pages, image-heavy posts, text-heavy posts, and code-heavy posts.

### Thresholds
```javascript
"categories:performance": ["error", { minScore: 0.95, aggregationMethod: "median-run" }]
"categories:accessibility": ["error", { minScore: 1.0, aggregationMethod: "median-run" }]
"categories:best-practices": ["error", { minScore: 1.0, aggregationMethod: "median-run" }]
"categories:seo": ["error", { minScore: 1.0, aggregationMethod: "median-run" }]
```

### Report Generation
`scripts/lighthouse-report.mjs` reads `.lighthouseci/manifest.json` and generates a markdown table with median scores per URL. Output goes to `lighthouse-summary.md`.

### Concurrency
```yaml
concurrency:
  group: lighthouse-${{ github.ref }}
  cancel-in-progress: true
```

## Cloudflare Deployment

Auto-deploys via Cloudflare dashboard (not GitHub Actions).
No manual deployment workflow needed.

## Gotchas

- LHCI `collect` alone does NOT create `manifest.json` - must run `lhci upload` first
- `pnpm/action-setup@v4` requires explicit `version: 10`
- Heredoc URLs in workflow may have leading whitespace - use `sed` to trim
- serve package uses `-l PORT` flag (not `-p`)
