"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Glass } from "@/components/ui/Glass";
import type { Project } from "@/content/projects";
import { tick } from "@/lib/haptics";

/** Own coverflow: scroll-snap track, cards rotate/scale by distance from centre. Touch, wheel, keys, buttons. */
export function Coverflow({ items }: { items: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const lastActive = useRef(0);

  const layout = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const mid = t.scrollLeft + t.clientWidth / 2;
    let best = 0, bestD = Infinity;
    cards.current.forEach((c, i) => {
      if (!c) return;
      const cx = c.offsetLeft + c.offsetWidth / 2;
      const d = (cx - mid) / c.offsetWidth; // -n..n in card widths
      const clamped = Math.max(-1.6, Math.min(1.6, d));
      const rot = -clamped * 38;
      const scale = 1 - Math.min(Math.abs(d), 1.6) * 0.1;
      c.style.transform = `perspective(1100px) rotateY(${rot}deg) scale(${scale}) translateZ(${-Math.abs(clamped) * 60}px)`;
      c.style.opacity = String(1 - Math.min(Math.abs(d), 2) * 0.28);
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
    });
    if (best !== lastActive.current) { lastActive.current = best; tick(6); setActive(best); }
  }, []);

  useEffect(() => {
    layout();
    const t = track.current!;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); };
    t.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { t.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [layout]);

  const go = (i: number) => {
    const n = Math.max(0, Math.min(items.length - 1, i));
    cards.current[n]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects">
      <div
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
        }}
        className="no-scrollbar relative left-1/2 -ml-[50vw] flex w-screen snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50vw-150px)] py-10 md:gap-6 md:px-[calc(50vw-210px)]"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((p, i) => (
          <Glass
            as="article"
            key={p.id}
            ref={(el: HTMLElement | null) => { cards.current[i] = el; }}
            onClick={() => i !== active && go(i)}
            aria-current={i === active}
            className="flex h-[440px] w-[300px] shrink-0 snap-center flex-col justify-between overflow-hidden p-6 will-change-transform md:h-[480px] md:w-[420px] md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
              style={{ background: p.hue }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{p.kind}</span>
                <span className="tnum text-xs text-[var(--paper-faint)]">{p.year}</span>
              </div>
              <h3 className="font-display mt-6 text-3xl leading-[1.02] tracking-tight md:text-4xl">{p.title}</h3>
              <p className="hand mt-2 text-xl text-accent md:text-2xl">{p.kicker}</p>
              <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-[var(--paper-dim)] md:text-[0.95rem]">{p.blurb}</p>
            </div>
            <div className="relative">
              <ul className="mb-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <li key={s} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.7rem] text-[var(--paper-dim)]">{s}</li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={i === active ? 0 : -1}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-paper underline decoration-accent decoration-2 underline-offset-4"
              >
                View on GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </Glass>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" className="glass grid h-11 w-11 place-items-center !rounded-full transition-transform active:scale-95 disabled:opacity-30">←</button>
        <p className="tnum min-w-16 text-center text-sm text-[var(--paper-dim)]" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button onClick={() => go(active + 1)} disabled={active === items.length - 1} aria-label="Next project" className="glass grid h-11 w-11 place-items-center !rounded-full transition-transform active:scale-95 disabled:opacity-30">→</button>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
