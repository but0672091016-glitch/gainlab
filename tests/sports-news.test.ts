import assert from "node:assert/strict";
import test from "node:test";
import { parseRssFeed, parseSuspilneBoxing } from "../lib/sports-news";

test("RSS parser keeps verified source links and decodes titles", () => {
  const xml = `
    <rss><channel><item>
      <title><![CDATA[Кубок України &amp; новий рекорд]]></title>
      <link>https://ukrpowerlifting.com/news/test/</link>
      <pubDate>Sun, 11 Oct 2026 10:00:00 GMT</pubDate>
    </item></channel></rss>
  `;

  const items = parseRssFeed(xml, {
    name: "Федерація пауерліфтингу України",
    category: "Пауерліфтинг",
    allowedHost: "ukrpowerlifting.com",
  });

  assert.equal(items.length, 1);
  assert.equal(items[0].title, "Кубок України & новий рекорд");
  assert.equal(items[0].category, "Пауерліфтинг");
});

test("RSS parser rejects links outside the configured source", () => {
  const xml = `
    <rss><channel><item>
      <title>Небезпечне посилання</title>
      <link>https://example.com/phishing</link>
      <pubDate>Sun, 11 Oct 2026 10:00:00 GMT</pubDate>
    </item></channel></rss>
  `;

  assert.equal(parseRssFeed(xml, {
    name: "Федерація",
    category: "Спорт",
    allowedHost: "ukrpowerlifting.com",
  }).length, 0);
});

test("Suspilne parser extracts a boxing headline", () => {
  const html = `
    <article>
      <a href="https://suspilne.media/sport/123456-test-news/">Фото</a>
      <span class="c-article-card__headline-inner">Українець здобув перемогу</span>
      <time datetime="2026-10-11T12:30+03:00">11 жовтня</time>
    </article>
  `;

  const items = parseSuspilneBoxing(html);
  assert.equal(items.length, 1);
  assert.equal(items[0].source, "Суспільне Спорт");
  assert.equal(items[0].title, "Українець здобув перемогу");
});
