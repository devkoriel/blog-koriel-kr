# Content & Blog Post Rules

## Creating New Posts

File: `src/data/blog/<slug>.md`
Slug: kebab-case, descriptive, English

Required frontmatter:
```yaml
---
title: "Post Title"
author: Jinsoo Heo
pubDatetime: 2026-02-21T23:00:00.000Z  # ISO 8601, UTC
draft: false
tags:
  - tag1
  - tag2
description: "Brief description for SEO and listing pages"
lang: ko
---
```

## Tag Conventions

Existing tags (use before creating new ones):
- Topics: life, career, development, retrospective, automation, security, monitoring
- Languages: c, c++, python, go, rust, typescript, javascript, bash
- Infra: haproxy, kubernetes, docker, aws, nginx, devops, backend, database
- Web: web-development, astro, tailwindcss, react
- Tools: vim, git, github-actions, gitlab-ci
- Concepts: design-patterns, type-system, memory-management, optimization, testing

## Writing Style

- Posts are primarily in Korean (lang: ko)
- Technical terms can stay in English
- Code blocks use Shiki syntax highlighting with GitHub themes
- File names can be shown on code blocks using `// [!code file:filename]` notation
- Use relative paths for images: `![alt](/images/blog/filename.webp)`

## Images in Posts

- Store in `public/images/blog/`
- Must be WebP, max 720px width, quality 70-75
- First image in a post gets eager loading automatically (do not manually add loading attributes)
- Use descriptive alt text for accessibility (100% a11y score required)

## Content Collection

Defined in `src/content.config.ts`:
- Loader: glob pattern `**/[^_]*.md` in `src/data/blog`
- Files prefixed with `_` are excluded
- Schema validates all frontmatter with Zod
