"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";

const LAYERS = [
  { key: "shape", label: "Shape layer", note: "brand panel, editable fill" },
  { key: "image", label: "Image layer", note: "SAM3-segmented product" },
  { key: "text", label: "Text layer", note: "font-matched headline" },
] as const;

function Earring() {
  return (
    <svg viewBox="0 0 120 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="gem" cx="35%" cy="30%"><stop offset="0" stopColor="#fff6e0" /><stop offset="1" stopColor="#ff5a2c" /></radialGradient>
        <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stopColor="#ffe29a" /><stop offset="1" stopColor="#c98a1f" /></linearGradient>
      </defs>
      <path d="M60 8 v28" stroke="url(#gold)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="52" r="18" fill="url(#gold)" />
      <path d="M60 70 C 20 100, 30 150, 60 188 C 90 150, 100 100, 60 70Z" fill="url(#gold)" opacity=".92" />
      <circle cx="60" cy="118" r="20" fill="url(#gem)" />
      <path d="M50 108 l8 -6" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}

/** Drag/slide to pull a generated poster apart into the typed layers the template-analysis pipeline produces. */
export function LayerPoster() {
  const [v, setV] = useState(0.55);
  const raw = useMotionValue(0.55);
  const p = useSpring(raw, { stiffness: 160, damping: 22 });
  const rotX = useTransform(p, [0, 1], [0, 58]);
  const rotZ = useTransform(p, [0, 1], [0, -32]);
  const gap = useTransform(p, [0, 1], [0, 92]);
  const gap2 = useTransform(p, [0, 1], [0, 184]);
  const labelOpacity = useTransform(p, [0.25, 0.7], [0, 1]);

  return (
    <div className="glass p-5 md:p-8">
      <div className="relative mx-auto h-[360px] w-full max-w-md [perspective:1200px] md:h-[440px]">
        <motion.div style={{ rotateX: rotX, rotateZ: rotZ }} className="absolute inset-0 m-auto h-[300px] w-[230px] [transform-style:preserve-3d] md:h-[360px] md:w-[270px]">
          <motion.div style={{ translateZ: 0 }} className="absolute inset-0 rounded-2xl border border-white/20 bg-[linear-gradient(160deg,#8a2a12,#ff5a2c_60%,#ffb347)] shadow-2xl" />
          <motion.div style={{ translateZ: gap }} className="absolute inset-x-6 bottom-8 top-14 grid place-items-center">
            <div className="h-full w-24"><Earring /></div>
          </motion.div>
          <motion.div style={{ translateZ: gap2 }} className="absolute inset-x-5 top-5">
            <p className="font-display text-3xl italic leading-none text-paper drop-shadow">Everyday<br />gold.</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-paper/80">Studs · from ₹4,999</p>
          </motion.div>
        </motion.div>

        <motion.ul style={{ opacity: labelOpacity }} className="absolute inset-y-0 right-0 flex flex-col justify-between py-8 text-right text-xs md:text-sm" aria-hidden>
          {[...LAYERS].reverse().map((l) => (
            <li key={l.key}><span className="hand block text-lg text-accent md:text-xl">{l.label}</span><span className="text-[var(--paper-dim)]">{l.note}</span></li>
          ))}
        </motion.ul>
      </div>

      <label className="mx-auto mt-4 block max-w-md">
        <span className="eyebrow mb-2 flex justify-between"><span>Flat poster</span><span>Typed layers</span></span>
        <input type="range" min={0} max={1} step={0.01} value={v}
          onChange={(e) => { const n = Number(e.target.value); setV(n); raw.set(n); }}
          className="h-11 w-full cursor-pointer accent-[var(--accent)]" aria-label="Separate the poster into layers" />
      </label>
    </div>
  );
}
