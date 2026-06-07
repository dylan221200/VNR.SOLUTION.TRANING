import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const preferredPort = Number(process.env.PORT || 5174);
const root = resolve(".");
const distRoot = resolve("dist");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function safeResolve(base, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const candidate = resolve(base, normalize(decoded).replace(/^[/\\]+/, ""));
  return candidate.startsWith(base) ? candidate : null;
}

function sendFile(res, filePath) {
  res.writeHead(200, {
    "Content-Type": mime[extname(filePath).toLowerCase()] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
}

function handler(req, res) {
  const url = req.url || "/";
  const candidates = [];

  if (url.startsWith("/Images/") || url.startsWith("/presents/")) {
    candidates.push(safeResolve(root, url));
  } else {
    candidates.push(safeResolve(distRoot, url === "/" ? "/index.html" : url));
  }

  for (const candidate of candidates) {
    if (candidate && existsSync(candidate) && statSync(candidate).isFile()) {
      sendFile(res, candidate);
      return;
    }
  }

  sendFile(res, join(distRoot, "index.html"));
}

function start(port, attempts = 0) {
  const server = createServer(handler);

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attempts < 20) {
      start(port + 1, attempts + 1);
      return;
    }

    throw error;
  });

  server.listen(port, "127.0.0.1", () => {
    console.log(`Static website ready at http://127.0.0.1:${port}`);
  });
}

start(preferredPort);
