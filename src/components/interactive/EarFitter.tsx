"use client";
import { animate, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { thud, tick } from "@/lib/haptics";

const W = 320, H = 380;
const PIERCE = { x: 196, y: 222 }; // piercing point on the lobe
const SNAP = 46;

/** The YOLO11-pose idea, playable: drag the stud toward the ear. It lights the keypoints and snaps on the piercing point. */
export function EarFitter() {
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(60), y = useMotionValue(70);
  const [near, setNear] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [showPts, setShowPts] = useState(true);

  const dist = () => Math.hypot(x.get() - PIERCE.x, y.get() - PIERCE.y);
  const check = () => { const n = dist() < SNAP * 2; if (n !== near) { setNear(n); if (n) tick(8); } };

  const release = () => {
    if (dist() < SNAP) {
      animate(x, PIERCE.x, { type: "spring", duration: 0.4, bounce: 0.35 });
      animate(y, PIERCE.y, { type: "spring", duration: 0.4, bounce: 0.35 });
      if (!placed) thud();
      setPlaced(true);
    } else setPlaced(false);
  };

  const reset = () => { animate(x, 60); animate(y, 70); setPlaced(false); setNear(false); };

  return (
    <div className="glass p-5 md:p-8">
      <div ref={box} className="relative mx-auto touch-none select-none" style={{ width: "100%", maxWidth: W, aspectRatio: `${W}/${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {/* ear drawn like a quick ink sketch */}
          <path d="M90 300 C 20 220, 40 60, 150 40 C 250 25, 300 120, 262 200 C 244 238, 230 262, 214 300"
            fill="rgb(243 237 226 / 0.05)" stroke="rgb(243 237 226 / 0.75)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 250 C 90 190, 110 100, 165 95 C 215 92, 232 150, 205 190" fill="none" stroke="rgb(243 237 226 / 0.5)" strokeWidth="2" strokeLinecap="round" />
          <path d="M150 170 C 135 150, 160 130, 175 145" fill="none" stroke="rgb(243 237 226 / 0.4)" strokeWidth="2" strokeLinecap="round" />
          <path d="M120 300 C 140 345, 215 345, 214 300 C 214 280, 130 280, 120 300Z" fill="rgb(243 237 226 / 0.07)" stroke="rgb(243 237 226 / 0.75)" strokeWidth="2.5" />
          {showPts && (
            <g>
              <circle cx={PIERCE.x} cy={PIERCE.y} r={near ? 16 : 9} fill="none" stroke="var(--accent)" strokeWidth="2" style={{ transition: "r 150ms" }} />
              <circle cx={PIERCE.x} cy={PIERCE.y} r="3" fill="var(--accent)" />
              <circle cx="168" cy="318" r="5" fill="none" stroke="#ffb347" strokeWidth="2" />
              <text x={PIERCE.x + 14} y={PIERCE.y - 12} fill="var(--accent)" fontSize="11" fontFamily="monospace">piercing</text>
              <text x="180" y="338" fill="#ffb347" fontSize="11" fontFamily="monospace">lobe-centre</text>
            </g>
          )}
        </svg>
        <motion.div
          drag dragConstraints={box} dragElastic={0.15} dragMomentum={false}
          style={{ x, y, left: -22, top: -22, width: 44, height: 44 }}
          onDrag={check} onDragEnd={release}
          className="absolute cursor-grab active:cursor-grabbing"
          whileDrag={{ scale: 1.15 }}
          role="button" aria-label="Draggable stud earring. Drag it to the ear's piercing point." tabIndex={0}
          onKeyDown={(e) => {
            const d = 12; const k = e.key;
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
          {placed ? <><span className="hand text-xl text-accent">Snapped.</span> That&apos;s the job of the trained pose model: 0.99 mAP50 on 1,090 labelled ears, exported to ONNX.</> : "Drag the stud toward the ear. Keypoints light up as you get close."}
        </p>
        <div className="flex shrink-0 flex-col gap-1">
          <button onClick={() => setShowPts((p) => !p)} className="min-h-11 rounded-full border border-[var(--line)] px-4 text-xs active:scale-[0.97]">{showPts ? "Hide" : "Show"} keypoints</button>
          <button onClick={reset} className="min-h-11 rounded-full border border-[var(--line)] px-4 text-xs active:scale-[0.97]">Reset</button>
        </div>
      </div>
    </div>
  );
}
