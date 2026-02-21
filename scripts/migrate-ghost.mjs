#!/usr/bin/env node
/**
 * Ghost to AstroPaper migration script.
 * Converts ghost-export.json into AstroPaper-compatible markdown files.
 * All images remain as external URLs to avoid Astro image processing conflicts.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import TurndownService from "turndown";

const MIGRATION_DIR = join(import.meta.dirname, "../../blog.koriel.kr-migration");
const BLOG_DIR = join(import.meta.dirname, "../src/data/blog");

const posts = JSON.parse(readFileSync(join(MIGRATION_DIR, "ghost-export.json"), "utf-8"));

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});

turndown.addRule("codeBlocks", {
  filter: (node) => node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE",
  replacement: (_content, node) => {
    const code = node.firstChild;
    const classAttr = code.getAttribute("class") || "";
    const langMatch = classAttr.match(/language-(\S+)/);
    const lang = langMatch ? langMatch[1] : "";
    const text = code.textContent || "";
    return `\n\n\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
  },
});

turndown.addRule("ghostFigure", {
  filter: (node) => node.nodeName === "FIGURE" && (node.getAttribute("class") || "").includes("kg-card"),
  replacement: (_content, node) => {
    const img = node.querySelector("img");
    if (!img) return "";
    const src = img.getAttribute("src") || "";
    const alt = img.getAttribute("alt") || "";
    const figcaption = node.querySelector("figcaption");
    const caption = figcaption ? figcaption.textContent : "";
    if (caption) {
      return `\n\n![${alt || caption}](${src})\n*${caption}*\n\n`;
    }
    return `\n\n![${alt}](${src})\n\n`;
  },
});

turndown.addRule("ghostBookmark", {
  filter: (node) => node.nodeName === "FIGURE" && (node.getAttribute("class") || "").includes("kg-bookmark"),
  replacement: (_content, node) => {
    const link = node.querySelector("a");
    if (!link) return "";
    const href = link.getAttribute("href") || "";
    const title = node.querySelector(".kg-bookmark-title");
    const titleText = title ? title.textContent : href;
    return `\n\n[${titleText}](${href})\n\n`;
  },
});

turndown.addRule("ghostCallout", {
  filter: (node) => node.nodeName === "DIV" && (node.getAttribute("class") || "").includes("kg-callout"),
  replacement: (content) => `\n\n> ${content.trim()}\n\n`,
});

function processImages(markdown) {
  // Replace Ghost internal URL placeholder with the actual blog URL
  return markdown.replace(/__GHOST_URL__/g, "https://blog.koriel.kr");
}

function escapeYaml(str) {
  if (!str) return '""';
  if (str.includes('"') || str.includes(":") || str.includes("#") || str.includes("'") || str.includes("\n")) {
    return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return str;
}

function generateDescription(post) {
  if (post.custom_excerpt) return post.custom_excerpt;
  if (!post.plaintext) return post.title;
  const text = post.plaintext.replace(/\n/g, " ").trim();
  if (text.length <= 160) return text;
  return text.substring(0, 157) + "...";
}

function detectLanguage(post) {
  const text = post.plaintext || "";
  const koreanChars = (text.match(/[\uAC00-\uD7AF]/g) || []).length;
  const totalChars = text.replace(/\s/g, "").length;
  if (totalChars === 0) return "ko";
  return koreanChars / totalChars > 0.1 ? "ko" : "en";
}

const redirects = [];

console.log(`Processing ${posts.length} posts...`);

for (const post of posts) {
  const pubDate = new Date(post.published_at);
  const modDate = post.updated_at ? new Date(post.updated_at) : null;
  const tags = post.tags.map((t) => t.toLowerCase().replace(/\s+/g, "-"));
  const lang = detectLanguage(post);
  const description = generateDescription(post);

  let markdown = turndown.turndown(post.html || "");
  markdown = processImages(markdown);

  const frontmatter = [
    "---",
    `title: ${escapeYaml(post.title)}`,
    `author: Jinsoo Heo`,
    `pubDatetime: ${pubDate.toISOString()}`,
  ];

  if (modDate && modDate.getTime() !== pubDate.getTime()) {
    frontmatter.push(`modDatetime: ${modDate.toISOString()}`);
  }

  if (post.featured) {
    frontmatter.push(`featured: true`);
  }

  frontmatter.push(`draft: false`);

  if (tags.length > 0) {
    frontmatter.push(`tags:`);
    for (const tag of tags) {
      frontmatter.push(`  - ${tag}`);
    }
  }

  if (post.feature_image) {
    let featureImage = post.feature_image.replace(/__GHOST_URL__/g, "https://blog.koriel.kr");
    // Skip ogImage for old Ghost internal images (2017 images are inaccessible)
    if (!featureImage.includes("blog.koriel.kr/content/images/")) {
      frontmatter.push(`ogImage: ${escapeYaml(featureImage)}`);
    }
  }

  frontmatter.push(`description: ${escapeYaml(description)}`);
  frontmatter.push(`lang: ${lang}`);
  frontmatter.push(`---`);

  const content = frontmatter.join("\n") + "\n\n" + markdown.trim() + "\n";

  const filename = `${post.slug}.md`;
  writeFileSync(join(BLOG_DIR, filename), content, "utf-8");
  console.log(`  Created: ${filename} (${lang})`);

  redirects.push(`/${post.slug}/ /posts/${post.slug}/ 301`);
}

const redirectsContent = redirects.join("\n") + "\n";
writeFileSync(join(import.meta.dirname, "../public/_redirects"), redirectsContent, "utf-8");
console.log(`\nCreated _redirects with ${redirects.length} entries`);

console.log(`\nMigration complete! ${posts.length} posts converted.`);
