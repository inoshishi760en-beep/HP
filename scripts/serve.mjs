import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import { resolve, extname, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".xml": "application/xml",
};
http
  .createServer((req, res) => {
    try {
      let pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (pathname.startsWith("/HP/")) pathname = pathname.slice(3);
      let file = resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      if (statSync(file).isDirectory()) file = resolve(file, "index.html");
      res.writeHead(200, {
        "Content-Type": mime[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      createReadStream(resolve(root, "404.html")).pipe(res);
    }
  })
  .listen(4173, "127.0.0.1", () =>
    console.log("Preview: http://127.0.0.1:4173/HP/"),
  );
