"use client";
import { useCallback } from "react";
import type { PointerEvent } from "react";

/** Sets --mx/--my on the element so `.glass` renders a specular highlight under the pointer. */
export function useGlassPointer() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);
}
