export type Sketch = { id: string; src: string; title: string; caption: string; wide?: boolean };

/** AI-assisted ink studies (Nano Banana 2.1) in one chalk-on-black style.
 *  Replace/add real drawings by dropping files into /public/sketches and listing them in `realSketches`. */
export const sketches: Sketch[] = [
  { id: "sk-1", src: "/art/sk-1.png", title: "The desk", caption: "Where the queue gets designed. Coffee is a dependency." },
  { id: "sk-2", src: "/art/sk-2.png", title: "Frames", caption: "Every pipeline is a film strip if you squint." },
  { id: "sk-3", src: "/art/sk-3.png", title: "Floaty", caption: "An astronaut and a balloon that says something wise." },
  { id: "sk-4", src: "/art/sk-4.png", title: "Recursion", caption: "A hand drawing a hand drawing a hand." },
  { id: "sk-5", src: "/art/sk-5.png", title: "Uptime", caption: "Cat on servers. Warmest SLA in the industry.", },
  { id: "sk-6", src: "/art/sk-6.png", title: "Bangalore", caption: "Kites over the skyline, city I build things in.", wide: true },
];

/** Bharath's own drawings: add { src, title, caption } here. */
export const realSketches: Sketch[] = [];
