import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = "https://inoshishi760en-beep.github.io/HP/";
const pages = [
  "index.html",
  "service/index.html",
  "company/index.html",
  "contact/index.html",
  "privacy/index.html",
  "404.html",
  "service.html",
  "company.html",
  "contact.html",
];
let checked = 0;
for (const file of pages) {
  const html = readFileSync(resolve(root, file), "utf8");
  assert(!html.includes("example.com"), `${file}: placeholder URL`);
  assert(!html.includes('href="#"'), `${file}: empty link`);
  if (!["service.html", "company.html", "contact.html"].includes(file)) {
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${file}: one main heading`,
    );
    assert(html.includes('<main id="main">'), `${file}: main landmark`);
    assert(
      html.includes("8:00〜18:00 / 日曜定休"),
      `${file}: consistent hours`,
    );
    assert(
      html.includes("https://lin.ee/80STrad"),
      `${file}: official LINE URL`,
    );
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll("&amp;", "&");
    const url = new URL(raw, base + file);
    if (!url.href.startsWith(base)) continue;
    let target = resolve(
      root,
      decodeURIComponent(url.pathname.slice("/HP/".length)),
    );
    assert(existsSync(target), `${file}: missing ${raw}`);
    if (statSync(target).isDirectory()) target = resolve(target, "index.html");
    assert(existsSync(target), `${file}: missing directory index ${raw}`);
    if (url.hash)
      assert(
        readFileSync(target, "utf8").includes(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        ),
        `${file}: broken anchor ${raw}`,
      );
    checked++;
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(match[1]);
}
assert(readFileSync(resolve(root, "sitemap.xml"), "utf8").includes(base));
console.log(
  `Verified ${pages.length} pages and ${checked} internal links/assets; metadata, hours, LINE URL, anchors and structured data passed.`,
);
