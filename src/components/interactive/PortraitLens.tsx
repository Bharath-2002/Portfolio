"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Photo with a "sketch lens": a soft circle that reveals the pencil version.
 * Mouse: follows hover. Touch: drag. Idle: drifts on a figure-8 so it's alive on first paint.
 */
export function PortraitLens({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const reduce = usePrefersReducedMotion();
  const manual = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const set = (x: number, y: number, r: number) => {
    const el = box.current;
    if (!el) return;
    el.style.setProperty("--lx", `${x}%`);
    el.style.setProperty("--ly", `${y}%`);
    el.style.setProperty("--lr", `${r}px`);
  };

  // idle figure-8 until the user interacts
  useEffect(() => {
    if (reduce) {
      set(50, 40, 120);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      if (!manual.current) {
        const s = (t - t0) / 1000;
        set(50 + Math.sin(s * 0.9) * 22, 38 + Math.sin(s * 1.8) * 10, 120);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const track = (e: React.PointerEvent) => {
    const el = box.current!;
    const r = el.getBoundingClientRect();
    manual.current = true;
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => (manual.current = false), 2500);
    set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100, pressed ? 190 : 130);
  };

  return (
    <div
      ref={box}
      data-cursor
      onPointerMove={track}
      onPointerDown={(e) => {
        setPressed(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        track(e);
      }}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      role="img"
      aria-label="Portrait of Bharath. Move the lens over it to reveal a pencil sketch."
      className={`relative isolate aspect-[760/714] touch-pan-y select-none overflow-hidden rounded-[var(--r-card)] border border-[var(--line)] ${className}`}
      style={{ ["--lx" as string]: "50%", ["--ly" as string]: "40%", ["--lr" as string]: "120px" }}
    >
      <Image
        src="/art/portrait.jpg"
        alt=""
        fill
        priority
        sizes="(min-width:1024px) 520px, 90vw"
        className="object-cover object-left grayscale"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 62%, transparent 100%)",
          maskImage: "radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 62%, transparent 100%)",
        }}
      >
        <Image
          src="/art/portrait-sketch.jpg"
          alt=""
          fill
          sizes="(min-width:1024px) 520px, 90vw"
          className="object-cover object-left"
          draggable={false}
        />
      </div>
      {/* lens rim */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[calc(var(--lr)*2*0.78)] w-[calc(var(--lr)*2*0.78)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        style={{ left: "var(--lx)", top: "var(--ly)", boxShadow: "inset 0 0 30px rgb(255 255 255/.12)" }}
      />
      <span className="hand pointer-events-none absolute bottom-3 left-4 rounded-full bg-ink/60 px-3 py-1 text-lg text-paper backdrop-blur-md">
        {pressed ? "pencil mode ✎" : "drag me, I'm sketchy"}
      </span>
    </div>
  );
}
