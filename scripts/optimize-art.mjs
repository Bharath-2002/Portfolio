// Convert generated PNG art → WebP (≤1400px). Run after generate-art.mjs. Removes the PNG source.
import sharp from "sharp";
import { readdirSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(import.meta.dirname, "../public/art");
for (const f of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
  const out = resolve(dir, f.replace(/\.png$/, ".webp"));
  await sharp(resolve(dir, f)).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  unlinkSync(resolve(dir, f));
  console.log("webp", f);
}
