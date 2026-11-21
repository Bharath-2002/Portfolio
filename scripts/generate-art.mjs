// Build-time art generator (Nano Banana 2.1). Run: node scripts/generate-art.mjs [name...]
// The API key is read from .env and never shipped to the client.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(resolve(root, ".env"), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
const MODEL = "gemini-nano-banana-2.1";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const STYLE =
  "Hand-drawn white chalk ink line illustration on a pure solid black background (#000000), loose confident sketchy linework with slight hand tremor, minimal cross-hatching, a few small scribbled doodles around. White lines only, no color, no gradients, no text, no watermark, generous empty margins.";

const JOBS = {
  "ch-quantiphi": `${STYLE} Subject: a friendly robot arm writing a SQL query on a floating notebook page, a stack of database cylinders beside it, a speech bubble with a tiny chart. Square composition.`,
  "ch-jnaara": `${STYLE} Subject: a head-and-shoulders silhouette with a branching neural memory tree growing out of the head, small vector dots and links, a copilot paper-plane circling it, a clock for persistent memory. Square composition.`,
  "ch-bluestone": `${STYLE} Subject: a human ear with a delicate stud earring, tiny keypoint crosshair markers on the lobe, a layered poster sheet peeling apart into text, image and shape layers beside it. Square composition.`,
  "doodle-hero": `${STYLE} Subject: a playful tangle of loops and arrows converging into a lightbulb, with small stars, a pencil and a floppy-eared cat doodle. Wide composition 16:9.`,
  "ear": `${STYLE} Subject: a single human ear in clean side profile, facing right with the lobe pointing down, bold clear outline of helix, antihelix and a visible earlobe, simple and anatomically readable, no jewelry, no head, centered, large. Portrait 3:4 composition.`,
  "sk-1": `${STYLE} Subject: a cozy desk with a laptop, a mug of steaming coffee, a plant and stacked books. Square composition.`,
  "sk-2": `${STYLE} Subject: a camera and a film strip with tiny landscapes inside the frames. Square composition.`,
  "sk-3": `${STYLE} Subject: an astronaut floating and holding a balloon shaped like a speech bubble. Square composition.`,
  "sk-4": `${STYLE} Subject: a hand holding a pencil that is drawing a hand holding a pencil (Escher style loop). Square composition.`,
  "sk-5": `${STYLE} Subject: a sleepy cat curled on top of a stack of servers with tiny blinking lights. Square composition.`,
  "sk-6": `${STYLE} Subject: a city skyline of Bangalore-style buildings with a sun, birds and kites. Wide composition.`,
};

// Photo → pencil sketch (used by the portrait lens on the home page)
const SKETCH_PROMPT =
  "Redraw this exact portrait as a detailed graphite pencil sketch on warm off-white paper: keep the face, expression, hair and pose identical and recognisable, loose hatching, visible construction lines, smudged shading. Remove any watermark or logo. Keep the same framing and aspect ratio. No text.";

async function call(parts, aspectRatio) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { imageSize: "2K", ...(aspectRatio ? { aspectRatio } : {}) },
      },
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json.error ?? json).slice(0, 300));
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("no image: " + JSON.stringify(json).slice(0, 300));
  return Buffer.from(part.inlineData.data, "base64");
}

const only = process.argv.slice(2);
const want = (n) => only.length === 0 || only.includes(n);

for (const [name, prompt] of Object.entries(JOBS)) {
  const out = resolve(root, "public/art", `${name}.png`);
  if (!want(name) || (existsSync(out) && !only.includes(name))) continue;
  const ar = name === "doodle-hero" || name === "sk-6" ? "16:9" : name === "ear" ? "3:4" : "1:1";
  try {
    writeFileSync(out, await call([{ text: prompt }], ar));
    console.log("ok", name);
  } catch (e) {
    console.error("FAIL", name, e.message);
  }
}

if (want("portrait-sketch")) {
  const out = resolve(root, "public/art/portrait-sketch.png");
  if (!existsSync(out) || only.includes("portrait-sketch")) {
    const photo = readFileSync(resolve(root, "photo.jpeg")).toString("base64");
    try {
      writeFileSync(
        out,
        await call([{ text: SKETCH_PROMPT }, { inlineData: { mimeType: "image/jpeg", data: photo } }], "16:9"),
      );
      console.log("ok portrait-sketch");
    } catch (e) {
      console.error("FAIL portrait-sketch", e.message);
    }
  }
}
