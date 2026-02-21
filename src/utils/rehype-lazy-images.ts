import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Rehype plugin to add loading="lazy" and decoding="async" to images.
 * Skips lazy loading on the first image (likely LCP element) to avoid
 * delaying its render. All images get decoding="async".
 */
export function rehypeLazyImages() {
  return (tree: Root) => {
    let imageCount = 0;
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties ??= {};
        node.properties.decoding = "async";
        if (imageCount === 0) {
          node.properties.loading = "eager";
          node.properties.fetchpriority = "high";
        } else {
          node.properties.loading = "lazy";
        }
        imageCount++;
      }
    });
  };
}
