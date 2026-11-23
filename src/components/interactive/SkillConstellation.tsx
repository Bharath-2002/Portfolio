"use client";
import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/content/skills";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Node = { label: string; g: number; cx: number; x: number; y: number; vx: number; vy: number; hx: number; hy: number; r: number };

const GROUP_COLORS = ["#ff5a2c", "#ffb347", "#f3ede2"]; // accent family + paper

/** Canvas constellation. Pointer (mouse or finger) repels nodes; tap a group chip to focus it. */
export function SkillConstellation() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const focusRef = useRef<number | null>(null);
  const reduce = usePrefersReducedMotion();
  useEffect(() => { focusRef.current = focus; }, [focus]);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const fontFamily = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
    const ptr = { x: -999, y: -999 };
    let nodes: Node[] = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = w > 640;
      const centers = wide
        ? [[0.2, 0.5], [0.5, 0.5], [0.8, 0.5]]
        : [[0.5, 0.17], [0.5, 0.5], [0.5, 0.83]];
      const radius = wide ? Math.min(w * 0.15, h * 0.4) : Math.min(w * 0.3, h * 0.125);
      nodes = [];
      skillGroups.forEach((grp, g) => {
        const n = grp.skills.length;
        grp.skills.forEach((label, i) => {
          const a = (i / n) * Math.PI * 2 + g;
          const rr = radius * (0.7 + (i % 2) * 0.35);
          const hx = Math.min(w - (wide ? 110 : 120), Math.max(wide ? 110 : 120, centers[g][0] * w + Math.cos(a) * rr * (wide ? 1.1 : 1)));
          const hy = centers[g][1] * h + Math.sin(a) * rr * 0.8;
          nodes.push({ label, g, cx: centers[g][0] * w, x: hx, y: hy, vx: 0, vy: 0, hx, hy, r: 3 + (label.length % 3) });
        });
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const f = focusRef.current;
      ctx.font = `500 12px ${fontFamily}`;
      ctx.textBaseline = "middle";
      // links within groups
      for (let g = 0; g < skillGroups.length; g++) {
        const gn = nodes.filter((n) => n.g === g);
        ctx.globalAlpha = f === null || f === g ? 0.22 : 0.05;
        ctx.strokeStyle = GROUP_COLORS[g];
        ctx.lineWidth = 1;
        ctx.beginPath();
        gn.forEach((n, i) => { const m = gn[(i + 1) % gn.length]; ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); });
        gn.forEach((n, i) => { const m = gn[(i + 3) % gn.length]; ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); });
        ctx.stroke();
      }
      for (const n of nodes) {
        const on = f === null || f === n.g;
        ctx.globalAlpha = on ? 1 : 0.22;
        ctx.fillStyle = GROUP_COLORS[n.g];
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
        ctx.fillStyle = on ? "rgba(243,237,226,.92)" : "rgba(243,237,226,.5)";
        const left = n.hx < n.cx;
        ctx.textAlign = left ? "right" : "left";
        ctx.fillText(n.label, left ? n.x - n.r - 6 : n.x + n.r + 6, n.y);
        ctx.textAlign = "left";
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        const dx = n.x - ptr.x, dy = n.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) { const d = Math.sqrt(d2) || 1; const f = (1 - d / 120) * 2.2; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
        n.vx += (n.hx - n.x) * 0.02; n.vy += (n.hy - n.y) * 0.02;
        n.vx *= 0.88; n.vy *= 0.88; n.x += n.vx; n.y += n.vy;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => { const r = c.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; };
    const onLeave = () => { ptr.x = ptr.y = -999; };
    build();
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerleave", onLeave);
    c.addEventListener("pointerup", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(c);
    if (reduce) draw(); else raf = requestAnimationFrame(step);
    const redraw = () => reduce && draw();
    window.addEventListener("click", redraw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("click", redraw); c.removeEventListener("pointermove", onMove); c.removeEventListener("pointerleave", onLeave); c.removeEventListener("pointerup", onLeave); };
  }, [reduce]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Focus a skill group">
        {skillGroups.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setFocus(focus === i ? null : i)}
            aria-pressed={focus === i}
            className="min-h-11 rounded-full border px-4 text-sm transition-colors duration-150 active:scale-[0.97]"
            style={{
              borderColor: focus === i ? GROUP_COLORS[i] : "var(--line)",
              background: focus === i ? "rgb(255 255 255 / 0.1)" : "transparent",
            }}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: GROUP_COLORS[i] }} />
            {g.label}
          </button>
        ))}
      </div>
      <div className="glass on-dark overflow-hidden">
        <canvas ref={canvas} data-cursor className="block h-[620px] w-full touch-pan-y md:h-[460px]" aria-hidden />
      </div>
      <dl className="mt-6 grid gap-4 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.id}>
            <dt className="eyebrow mb-2">{g.label}</dt>
            <dd className="text-sm leading-relaxed text-[var(--fg-dim)]">{g.skills.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
