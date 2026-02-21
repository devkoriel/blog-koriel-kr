# Performance Rules

## Lighthouse Scores (Non-Negotiable)

All pages must achieve 100/100/100/100 on both desktop and mobile.

CI thresholds (accounting for runner variance):
- Performance: >= 0.95 (median of 3 runs)
- Accessibility: = 1.0
- Best Practices: = 1.0
- SEO: = 1.0

## LCP Optimization

The largest contentful paint is the most volatile Lighthouse metric.

### First Image Handling
- `rehypeLazyImages` plugin sets `loading="eager"` + `fetchpriority="high"` on the first img in each post
- All subsequent images get `loading="lazy"`
- All images get `decoding="async"`

### LCP Preload
- `PostDetails.astro` extracts the first markdown image URL if it appears within the first 100 characters of the post body
- If found, a preload link is added to head via `Layout.astro`
- This only fires for posts that start with an image (not text-heavy posts)

### Why 100 Chars?
Posts that start with long text paragraphs have text as LCP, not an image. Preloading an image that is not LCP wastes bandwidth and can hurt scores.

## Image Optimization

All blog images in `public/images/blog/` must be:
- Format: WebP (never PNG/JPG in production)
- Max width: 720px
- Quality: 70-75
- Optimized with sharp before committing

Astro's image pipeline (`image.layout: "constrained"`) only processes images from `src/assets/`. Images in `public/` are served as-is, so they must be pre-optimized.

## CI Specifics

- `throttlingMethod: "simulate"` gives deterministic results (no network variance)
- `skipAudits: ["uses-http2", "redirects-http"]` because local serve does not support these
- `bf-cache` and `csp-xss` assertions are off (Cloudflare handles these)
- Chrome flags: `--no-sandbox --disable-gpu --disable-dev-shm-usage --disable-software-rasterizer`

## Known Variance

Mobile scores on text-heavy pages may fluctuate 99-100 due to ~49KB render-blocking CSS on simulated 4G. This is why performance threshold is 0.95, not 1.0.
