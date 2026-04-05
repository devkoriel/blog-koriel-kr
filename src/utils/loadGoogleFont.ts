async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    if (i < retries - 1) {
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    } else {
      throw new Error(
        `Fetch failed after ${retries} attempts. Status: ${res.status}`
      );
    }
  }
  throw new Error("Unreachable");
}

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const cssRes = await fetchWithRetry(API, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  });
  const css = await cssRes.text();

  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Failed to download dynamic font");

  const res = await fetchWithRetry(resource[1]);

  return res.arrayBuffer();
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Geist",
      font: "Geist",
      weight: 400,
      style: "normal",
    },
    {
      name: "Geist",
      font: "Geist",
      weight: 700,
      style: "bold",
    },
    {
      name: "Noto Sans KR",
      font: "Noto+Sans+KR",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans KR",
      font: "Noto+Sans+KR",
      weight: 700,
      style: "bold",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text, weight);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;
