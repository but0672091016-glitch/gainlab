import { cacheLife } from "next/cache";

export type SportNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
};

type RssSource = {
  name: string;
  category: string;
  feedUrl: string;
  allowedHost: string;
};

const RSS_SOURCES: RssSource[] = [
  {
    name: "Федерація пауерліфтингу України",
    category: "Пауерліфтинг",
    feedUrl: "https://ukrpowerlifting.com/feed/",
    allowedHost: "ukrpowerlifting.com",
  },
  {
    name: "Федерація бодібілдингу України",
    category: "Бодібілдинг і фітнес",
    feedUrl: "https://fbbu.com.ua/feed/",
    allowedHost: "fbbu.com.ua",
  },
  {
    name: "Федерація ММА України",
    category: "ММА",
    feedUrl: "https://mma.org.ua/feed/",
    allowedHost: "mma.org.ua",
  },
];

const SUSPILNE_BOXING_URL = "https://suspilne.media/sport/boxing/";

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function cleanText(value: string) {
  return decodeEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTag(block: string, tag: string) {
  const safeTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return block.match(new RegExp(`<${safeTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${safeTag}>`, "i"))?.[1] ?? "";
}

function safeArticleUrl(rawUrl: string, allowedHost: string) {
  try {
    const url = new URL(decodeEntities(rawUrl).trim());
    const normalizedHost = url.hostname.replace(/^www\./, "");
    if (url.protocol !== "https:" || normalizedHost !== allowedHost) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeDate(rawDate: string) {
  const date = new Date(rawDate);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function parseRssFeed(xml: string, source: Omit<RssSource, "feedUrl">): SportNewsItem[] {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return itemBlocks.flatMap((block) => {
    const title = cleanText(extractTag(block, "title"));
    const url = safeArticleUrl(cleanText(extractTag(block, "link")), source.allowedHost);
    const publishedAt = normalizeDate(cleanText(extractTag(block, "pubDate") || extractTag(block, "dc:date")));

    if (!title || !url || !publishedAt) return [];

    return [{
      id: url,
      title,
      url,
      source: source.name,
      category: source.category,
      publishedAt,
    }];
  });
}

export function parseSuspilneBoxing(html: string): SportNewsItem[] {
  const articleBlocks = html.match(/<article\b[\s\S]*?<\/article>/gi) ?? [];

  return articleBlocks.flatMap((block) => {
    const rawUrl = block.match(/href="(https:\/\/suspilne\.media\/sport\/\d+-[^"]+)"/i)?.[1] ?? "";
    const rawTitle = block.match(/class="[^"]*headline-inner[^"]*"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? "";
    const rawDate = block.match(/<time[^>]+datetime="([^"]+)"/i)?.[1] ?? "";
    const title = cleanText(rawTitle);
    const url = safeArticleUrl(rawUrl, "suspilne.media");
    const publishedAt = normalizeDate(rawDate);

    if (!title || !url || !publishedAt) return [];

    return [{
      id: url,
      title,
      url,
      source: "Суспільне Спорт",
      category: "Бокс",
      publishedAt,
    }];
  });
}

async function fetchText(url: string, accept: string) {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": "GainLab local sports news reader/0.1",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw new Error(`News source returned ${response.status}`);

  const content = await response.text();
  if (content.length > 2_000_000) throw new Error("News source response is too large");
  return content;
}

async function loadRssSource(source: RssSource) {
  const xml = await fetchText(source.feedUrl, "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8");
  return parseRssFeed(xml, source).slice(0, 4);
}

async function loadSuspilneBoxing() {
  const html = await fetchText(SUSPILNE_BOXING_URL, "text/html");
  return parseSuspilneBoxing(html).slice(0, 4);
}

export async function getSportsNews(): Promise<SportNewsItem[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 1_800, expire: 86_400 });

  const results = await Promise.allSettled([
    ...RSS_SOURCES.map(loadRssSource),
    loadSuspilneBoxing(),
  ]);

  const uniqueItems = new Map<string, SportNewsItem>();
  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) uniqueItems.set(item.url, item);
  }

  return [...uniqueItems.values()]
    .sort((first, second) => Date.parse(second.publishedAt) - Date.parse(first.publishedAt))
    .slice(0, 6);
}
