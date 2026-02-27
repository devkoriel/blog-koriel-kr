import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const baseUrl =
    site?.href.replace(/\/$/, "") ?? SITE.website.replace(/\/$/, "");

  const tags = [...new Set(sortedPosts.flatMap(p => p.data.tags))].sort();
  const today = new Date().toISOString().slice(0, 10);

  const body = `---
updated: ${today}
---

# ${SITE.title} — Koriel's Blog

${SITE.desc} Written by ${SITE.author}, a DevOps Engineer at Chronicle Labs, based in Seoul, Korea.

## What This Site Is

A personal technical blog covering DevOps, Kubernetes, CI/CD, Web3 oracle infrastructure, remote work, Tesla automation, and software engineering career reflections. Posts are written in Korean and English.

## Content Overview

${sortedPosts.length} published posts across these topics: ${tags.join(", ")}.

Most recent posts cover: ${sortedPosts
    .slice(0, 5)
    .map(p => p.data.title)
    .join("; ")}.

## Key Pages

- Blog posts: ${baseUrl}/posts
- About the author: ${baseUrl}/about
- All tags: ${baseUrl}/tags
- Archives: ${baseUrl}/archives
- RSS feed: ${baseUrl}/rss.xml
- LLM context: ${baseUrl}/llms.txt
- Search: ${baseUrl}/search

## What This Site Is Not

This site does not provide API documentation, SaaS services, or commercial products. It is a personal blog with no user accounts or authentication.

## Author

Jinsoo Heo (허진수) — DevOps Engineer with 8+ years of experience. Previously at PUBG, Dunamu (Upbit), and Karrot (Danggeun Market). Currently at Chronicle Labs building decentralized oracle infrastructure.

- Homepage: https://koriel.kr
- GitHub: https://github.com/devkoriel
- LinkedIn: https://www.linkedin.com/in/devkoriel

## Related Contexts

[Homepage AI context](https://koriel.kr/ai.txt)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
