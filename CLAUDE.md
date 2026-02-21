# blog.koriel.kr

Personal technical blog by Jinsoo Heo (devkoriel).

## Stack

- **Framework**: Astro 5.16 (SSG) with TypeScript strict mode
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography
- **Theme**: AstroPaper 5.5.1 (customized)
- **Package Manager**: pnpm 10
- **Deployment**: Cloudflare Workers (wrangler)
- **Search**: Pagefind (full-text, post-build indexed)
- **Comments**: Giscus (GitHub Discussions)

## Key Commands

```bash
pnpm build        # astro check + astro build + pagefind + copy search assets
pnpm preview      # Preview built site
pnpm format       # Prettier auto-format
pnpm lint         # ESLint
```

## Project Structure

```
src/
  data/blog/       # Markdown blog posts (content collection)
  components/      # Astro/React components
  layouts/         # Page layouts (Layout.astro, PostDetails.astro, etc.)
  pages/           # Routes (/, /posts, /tags, /about, /search, /archives)
  utils/           # Helpers + custom rehype/remark plugins
  styles/          # Global CSS + Tailwind
  config.ts        # Site config (SITE constant)
  constants.ts     # Social links, share options
  content.config.ts # Content collection schema (Zod)
scripts/
  lighthouse-report.mjs  # LHCI markdown report generator
public/images/blog/      # Blog images (WebP, 720px max, quality 70-75)
```

## Content Schema

Posts are in `src/data/blog/*.md` with this frontmatter:

```yaml
title: string          # Required
author: string         # Default: "Jinsoo Heo"
pubDatetime: date      # Required (ISO 8601)
modDatetime: date      # Optional
draft: boolean         # Optional (true = hidden)
tags: string[]         # Default: ["others"]
ogImage: string/image  # Optional (URL or local asset)
description: string    # Required
lang: "en" | "ko"      # Default: "ko"
canonicalURL: string   # Optional
hideEditPost: boolean  # Optional
timezone: string       # Optional
```

## Markdown Pipeline

**Remark**: remarkReadingTime, remarkToc, remarkCollapse
**Rehype**: rehypeExternalLinks, rehypeImgSize, rehypeLazyImages (custom)
**Shiki transformers**: fileName (v2 style), notationHighlight, notationWordHighlight, notationDiff

## Performance Rules (CRITICAL)

All pages must score **100/100/100/100** on Lighthouse (desktop + mobile).

- First image in posts: `loading="eager"` + `fetchpriority="high"` (via rehypeLazyImages)
- LCP preload: `<link rel="preload" as="image">` in head for posts with hero images within first 100 chars
- All blog images: WebP, max 720px width, quality 70-75
- Lighthouse CI enforces: Perf >= 95, A11y/BP/SEO = 100 (median of 3 runs)
- `throttlingMethod: "simulate"` for deterministic CI results
- Audits skipped in CI: `uses-http2`, `redirects-http` (local server limitations)

## Image Conventions

- Store in `public/images/blog/`
- Format: WebP only
- Max width: 720px
- Quality: 70-75
- Resize with sharp before committing
- Images in `public/` are NOT processed by Astro's image pipeline

## CI/CD

- **Lighthouse CI**: `.github/workflows/lighthouse.yml` runs on push/PR to main
  - Matrix: [desktop, mobile] in parallel
  - PR: 8 representative URLs; Push to main: all pages
  - Reports posted as sticky PR comments
- **Deploy**: Cloudflare Workers auto-deploys on push to main

## Config Files

- `lighthouserc.cjs` — LHCI config (.cjs because package.json has "type": "module")
- `wrangler.toml` — Cloudflare Workers config
- `astro.config.ts` — Astro + markdown + Shiki config
- `.prettierrc` — 80-char width, es5 trailing comma, no arrow parens

## Conventions

- Language: posts primarily in Korean (lang: "ko")
- Timezone: Asia/Seoul
- 6 posts per page
- Edit links point to GitHub repo
- OG images auto-generated via Satori + Resvg
- RSS feed at /rss.xml
- Sitemap at /sitemap-index.xml

## Do Not

- Use `loading="lazy"` on the first image in any post (LCP regression)
- Commit unoptimized images (PNG/JPG or images wider than 720px)
- Skip `astro check` before build (catches type errors)
- Use `module.exports` in .js files (project is ESM, use .cjs for CommonJS)
- Add `console.log` to production code
- Hardcode localhost URLs in content
