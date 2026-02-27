import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const baseUrl = site?.href.replace(/\/$/, "") ?? SITE.website.replace(/\/$/, "");

  const postLines = sortedPosts
    .map(({ data, id, filePath }) => {
      const path = getPath(id, filePath);
      return `- [${data.title}](${baseUrl}${path}): ${data.description.slice(0, 120)}`;
    })
    .join("\n");

  const body = `# ${SITE.title}

> ${SITE.desc}

Personal technical blog by ${SITE.author} — DevOps Engineer based in Seoul, Korea. Writing about DevOps, Kubernetes, Web3, and infrastructure engineering.

## Blog Posts

${postLines}

## Pages

- [About](${baseUrl}/about): About Jinsoo Heo — background, expertise, and contact information
- [Search](${baseUrl}/search): Full-text search across all posts
- [Tags](${baseUrl}/tags): Browse posts by topic
- [Archives](${baseUrl}/archives): All posts grouped by year and month
- [RSS](${baseUrl}/rss.xml): RSS feed for all posts

## Optional

- [Homepage](https://koriel.kr): Personal landing page
- [GitHub](https://github.com/devkoriel): Open source projects
- [LinkedIn](https://www.linkedin.com/in/devkoriel): Professional profile
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
