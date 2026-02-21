export const SITE = {
  website: "https://blog.koriel.kr/",
  author: "Jinsoo Heo",
  profile: "https://koriel.link/",
  desc: "DevOps, Kubernetes, Web3, and infrastructure engineering notes by Jinsoo Heo.",
  title: "devkoriel",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Edit on GitHub",
    url: "https://github.com/devkoriel/blog.koriel.kr/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Asia/Seoul",
} as const;
