"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const COLORS = [["Chalk", "#f3ede2"], ["Vermilion", "#ff5a2c"], ["Amber", "#ffb347"]] as const;
const SIZES = [2, 5, 11] as const;

/** Pointer-based sketch canvas (mouse, touch, pen). Undo, clear, save as PNG. */
export function DrawingPad({ height = 380 }: { height?: number }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<{ c: string; s: number; pts: [number, number][] }[]>([]);
  const cur = useRef<(typeof strokes.current)[number] | null>(null);
  const [color, setColor] = useState<string>(COLORS[0][1]);
  const [size, setSize] = useState<number>(SIZES[1]);
  const [empty, setEmpty] = useState(true);

  const paint = useCallback(() => {
    const c = cv.current!, ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = ctx.lineJoin = "round";
    for (const st of strokes.current) {
      ctx.strokeStyle = st.c; ctx.lineWidth = st.s; ctx.beginPath();
      st.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      if (st.pts.length === 1) ctx.lineTo(st.pts[0][0] + 0.1, st.pts[0][1]);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const c = cv.current!;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
      c.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(c);
    return () => ro.disconnect();
  }, [paint]);

  const pt = (e: React.PointerEvent): [number, number] => {
    const r = cv.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const down = (e: React.PointerEvent) => {
    cv.current!.setPointerCapture(e.pointerId);
    cur.current = { c: color, s: size, pts: [pt(e)] };
    strokes.current.push(cur.current); setEmpty(false); paint();
  };
  const move = (e: React.PointerEvent) => { if (!cur.current) return; cur.current.pts.push(pt(e)); paint(); };
  const up = () => { cur.current = null; };

  const undo = () => { strokes.current.pop(); setEmpty(strokes.current.length === 0); paint(); };
  const clear = () => { strokes.current = []; setEmpty(true); paint(); };
  const save = () => {
    const c = cv.current!, out = document.createElement("canvas");
    out.width = c.width; out.height = c.height;
    const o = out.getContext("2d")!; o.fillStyle = "#0d0c0b"; o.fillRect(0, 0, out.width, out.height); o.drawImage(c, 0, 0);
    const a = document.createElement("a"); a.download = "my-doodle.png"; a.href = out.toDataURL("image/png"); a.click();
  };

  return (
    <div className="glass on-dark p-4 md:p-6">
      <div className="relative overflow-hidden rounded-[var(--r-inner)] border border-[var(--line)] bg-black/30">
        <canvas ref={cv} data-cursor style={{ height }} className="block w-full touch-none cursor-crosshair"
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label="Drawing canvas" />
        {empty && <p className="hand pointer-events-none absolute inset-0 grid place-items-center text-3xl text-[var(--fg-faint)]">draw something here ✎</p>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1" role="radiogroup" aria-label="Colour">
          {COLORS.map(([n, c]) => (
            <button key={n} role="radio" aria-checked={color === c} aria-label={n} onClick={() => setColor(c)} className="grid h-11 w-11 place-items-center rounded-full">
              <span className={cn("h-6 w-6 rounded-full border-2 transition-transform", color === c ? "scale-110 border-fg" : "border-transparent")} style={{ background: c }} />
            </button>
          ))}
        </div>
        <div className="flex gap-1" role="radiogroup" aria-label="Brush size">
          {SIZES.map((s) => (
            <button key={s} role="radio" aria-checked={size === s} aria-label={`Size ${s}`} onClick={() => setSize(s)} className={cn("grid h-11 w-11 place-items-center rounded-full", size === s && "bg-white/10")}>
              <span className="rounded-full bg-fg" style={{ width: s + 3, height: s + 3 }} />
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" onClick={undo} disabled={empty}>Undo</Button>
          <Button variant="ghost" onClick={clear} disabled={empty}>Clear</Button>
          <Button variant="primary" onClick={save} disabled={empty}>Save PNG</Button>
        </div>
      </div>
    </div>
  );
}
