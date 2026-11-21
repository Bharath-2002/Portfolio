"use client";
import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useMediaQuery";

/** Soft glass ring that trails the mouse and swells over interactive things. Fine pointers only. */
export function Cursor() {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const on = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const hot = (e.target as HTMLElement)?.closest("a,button,[data-cursor],input,textarea,canvas,[role=button]");
      el.dataset.hot = hot ? "1" : "0";
    };
    const loop = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", on, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", on); cancelAnimationFrame(raf); };
  }, [fine]);

  if (!fine) return null;
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform">
      <div className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] transition-[transform,background-color] duration-200 [[data-hot='1']_&]:scale-[1.9] [[data-hot='1']_&]:bg-accent/25" />
    </div>
  );
}
