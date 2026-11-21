"use client";
import Image from "next/image";
import { animate, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { thud, tick } from "@/lib/haptics";

// Keypoints as fractions of the drawing, so they hold at any screen size.
const PIERCE = { x: 0.595, y: 0.745 };
const LOBE = { x: 0.575, y: 0.79 };
const STUD = 44;

/** The YOLO11-pose idea, playable: drag the stud toward the ear. Keypoints light up and the stud snaps to the piercing point. */
export function EarFitter() {
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(24), y = useMotionValue(40);
  const [near, setNear] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [showPts, setShowPts] = useState(true);

  const target = () => {
    const r = box.current!.getBoundingClientRect();
    return { x: PIERCE.x * r.width, y: PIERCE.y * r.height, snap: r.width * 0.15 };
  };
  const dist = () => { const t = target(); return { d: Math.hypot(x.get() - t.x, y.get() - t.y), t }; };
  const check = () => { const { d, t } = dist(); const n = d < t.snap * 2; if (n !== near) { setNear(n); if (n) tick(8); } };

  const release = () => {
    const { d, t } = dist();
    if (d < t.snap) {
      animate(x, t.x, { type: "spring", duration: 0.4, bounce: 0.35 });
      animate(y, t.y, { type: "spring", duration: 0.4, bounce: 0.35 });
      if (!placed) thud();
      setPlaced(true);
    } else setPlaced(false);
  };
  const reset = () => { animate(x, 24); animate(y, 40); setPlaced(false); setNear(false); };

  return (
    <div className="glass p-5 md:p-8">
      <div ref={box} className="relative mx-auto aspect-[3/4] w-full max-w-[340px] touch-none select-none">
        <Image src="/art/ear.webp" alt="" fill sizes="340px" className="ink object-contain" draggable={false} />
        {showPts && (
          <>
            <span aria-hidden className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent transition-[width,height] duration-150"
              style={{ left: `${PIERCE.x * 100}%`, top: `${PIERCE.y * 100}%`, width: near ? 34 : 18, height: near ? 34 : 18 }} />
            <span aria-hidden className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ffb347]"
              style={{ left: `${LOBE.x * 100}%`, top: `${LOBE.y * 100}%`, width: 10, height: 10 }} />
            <span aria-hidden className="pointer-events-none absolute -translate-y-1/2 font-mono text-[0.65rem] text-accent"
              style={{ left: `${PIERCE.x * 100 + 6}%`, top: `${PIERCE.y * 100 - 4}%` }}>piercing</span>
            <span aria-hidden className="pointer-events-none absolute -translate-y-1/2 text-right font-mono text-[0.65rem] text-[#ffb347]"
              style={{ right: `${100 - LOBE.x * 100 + 5}%`, top: `${LOBE.y * 100 + 4}%` }}>lobe-centre</span>
          </>
        )}
        <motion.div
          drag dragConstraints={box} dragElastic={0.15} dragMomentum={false}
          style={{ x, y, left: -STUD / 2, top: -STUD / 2, width: STUD, height: STUD }}
          onDrag={check} onDragEnd={release}
          className="absolute cursor-grab active:cursor-grabbing" whileDrag={{ scale: 1.15 }}
          role="button" tabIndex={0} aria-label="Draggable stud earring. Drag it to the ear's piercing point, or use arrow keys and Enter."
          onKeyDown={(e) => {
            const d = 12, k = e.key;
            if (k === "ArrowLeft") x.set(x.get() - d); if (k === "ArrowRight") x.set(x.get() + d);
            if (k === "ArrowUp") y.set(y.get() - d); if (k === "ArrowDown") y.set(y.get() + d);
            check(); if (k === "Enter") release();
          }}
        >
          <svg viewBox="0 0 44 44" className="h-full w-full drop-shadow-lg" aria-hidden>
            <circle cx="22" cy="22" r="14" fill="#e8b24a" /><circle cx="22" cy="22" r="8" fill="#ff5a2c" /><circle cx="18" cy="18" r="3" fill="#fff" opacity=".8" />
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto mt-5 flex max-w-sm items-center justify-between gap-3">
        <p className="min-h-12 text-sm text-[var(--paper-dim)]" aria-live="polite">
          {placed ? <><span className="hand text-xl text-accent">Snapped.</span> That&apos;s the job of the trained pose model: 0.99 mAP50 on 1,090 labelled ears, exported to ONNX.</> : "Drag the stud toward the earlobe. Keypoints light up as you get close."}
        </p>
        <div className="flex shrink-0 flex-col gap-1">
          <button onClick={() => setShowPts((p) => !p)} className="min-h-11 rounded-full border border-[var(--line)] px-4 text-xs active:scale-[0.97]">{showPts ? "Hide" : "Show"} keypoints</button>
          <button onClick={reset} className="min-h-11 rounded-full border border-[var(--line)] px-4 text-xs active:scale-[0.97]">Reset</button>
        </div>
      </div>
    </div>
  );
}
