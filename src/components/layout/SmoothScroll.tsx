"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Lenis smooth scrolling, off for reduced-motion users; resets on route change. */
export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    lenis.scrollTo(0, { immediate: true });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [path]);
  return null;
}
