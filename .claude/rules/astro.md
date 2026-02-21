# Astro & Build Rules

## ESM Project

`package.json` has `"type": "module"`. This means:
- All `.js` files are ES modules (use `import`/`export`)
- CommonJS configs (e.g., lighthouserc) MUST use `.cjs` extension
- This has caused bugs before: lighthouserc.js failed with "module is not defined in ES module scope"

## Build Pipeline

`pnpm build` runs: `astro check && astro build && pagefind --site dist --force-language en && cp -r dist/pagefind public/`

Key points:
- `astro check` validates TypeScript before building
- Pagefind indexes the built HTML for search
- Search assets are copied back to public/ for development

## Build Cache

Astro caches aggressively. After editing rehype/remark plugins or astro.config.ts:
- Use `pnpm astro build --force` to bypass cache
- Regular `pnpm build` may serve stale plugin output

## Astro Image Pipeline

`image.layout: "constrained"` with `responsiveStyles: true`:
- Only processes images imported from `src/assets/`
- Images in `public/` are served as-is (no processing)
- Uses `??=` for loading/decoding attributes (custom plugin values take precedence)

## Key Components

| Component | Purpose |
|-----------|---------|
| `Layout.astro` | Base layout, accepts `lcpImage` prop for preload |
| `PostDetails.astro` | Blog post layout, extracts LCP image from markdown |
| `Giscus.astro` | GitHub Discussions comments |
| `Tag.astro` | Tag display with slugified links |
| `Datetime.astro` | Date formatting with timezone support |
| `ShareLinks.astro` | Social sharing buttons |

## Custom Plugins

| Plugin | Location | Purpose |
|--------|----------|---------|
| `rehypeLazyImages` | `src/utils/rehype-lazy-images.ts` | Eager first image, lazy rest |
| `remarkReadingTime` | `src/utils/remark-reading-time.ts` | Reading time calculation |
| `transformerFileName` | `src/utils/transformers/fileName.js` | Code block file labels |

## Deployment

Cloudflare Workers via `wrangler.toml`:
- `html_handling = "drop-trailing-slash"`
- `not_found_handling = "404-page"`
- Auto-deploys on push to main (configured in Cloudflare dashboard)
