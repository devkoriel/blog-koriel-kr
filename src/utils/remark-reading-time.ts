import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (
    tree: Parameters<typeof toString>[0],
    { data }: { data: Record<string, unknown> }
  ) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    (
      data.astro as { frontmatter: Record<string, unknown> }
    ).frontmatter.readingTime = readingTime.text;
  };
}
