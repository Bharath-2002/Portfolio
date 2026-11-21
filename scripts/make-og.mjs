// 1200×630 share image: chalk illustration on the dark brand ground. node scripts/make-og.mjs
import sharp from "sharp";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const art = await sharp(resolve(root, "public/art/ch-bluestone.webp")).resize(520, 520).toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><radialGradient id="g" cx="0" cy="0" r="1" gradientTransform="translate(150 80) scale(700)"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".55"/><stop offset="1" stop-color="#0d0c0b" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="#0d0c0b"/><rect width="1200" height="630" fill="url(#g)"/>
<text x="72" y="250" font-family="Georgia,serif" font-size="120" fill="#f3ede2">Bharath S</text>
<text x="72" y="350" font-family="Georgia,serif" font-style="italic" font-size="64" fill="#f3ede2">AI Engineer &amp; doodler</text>
<text x="72" y="430" font-family="Helvetica,Arial,sans-serif" font-size="30" fill="#f3ede2" fill-opacity=".6">Production GenAI systems, hand-drawn stories.</text>
<rect x="72" y="480" width="150" height="6" rx="3" fill="#ff5a2c"/></svg>`);
await sharp(svg).composite([{ input: art, left: 640, top: 55, blend: "screen" }]).png().toFile(resolve(root, "public/og.png"));
console.log("og ok");
