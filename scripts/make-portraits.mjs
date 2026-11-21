// Local pencil-sketch filter (colour-dodge of grayscale over its blurred inverse). No network, no AI.
// Crops to the subject (drops the right side incl. the generator sparkle) → public/art/portrait*.jpg
import sharp from "sharp";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "photo.jpeg");
const crop = { left: 0, top: 0, width: 760, height: 714 };

const base = await sharp(src).extract(crop).resize({ width: 1520 }).toBuffer();
await sharp(base).modulate({ brightness: 0.98 }).jpeg({ quality: 86 }).toFile(resolve(root, "public/art/portrait.jpg"));

const gray = await sharp(base).grayscale().raw().toBuffer({ resolveWithObject: true });
const blur = await sharp(base).grayscale().negate().blur(14).raw().toBuffer();
const { data, info } = gray;
const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i++) {
  const d = Math.min(255, (data[i] * 256) / (255 - blur[i] + 1)); // colour dodge
  out[i] = Math.pow(d / 255, 1.35) * 255;                         // deepen the graphite
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
  .linear(1.0, -4)
  .tint("#efe6d4")
  .jpeg({ quality: 88 })
  .toFile(resolve(root, "public/art/portrait-sketch.jpg"));
console.log("portraits ok", info.width, info.height);
