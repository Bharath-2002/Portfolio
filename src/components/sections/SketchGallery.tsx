"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { realSketches, sketches, type Sketch } from "@/content/sketches";
import { cn, ease } from "@/lib/cn";

export function SketchGallery() {
  const [open, setOpen] = useState<Sketch | null>(null);
  const all = [...realSketches, ...sketches];
  const regular = all.filter((s) => !s.wide);
  const wide = all.filter((s) => s.wide);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {regular.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 0.06} className={cn("list-none", s.wide && "col-span-2 md:col-span-3")}>
            <li>
              <Glass as="button" onClick={() => setOpen(s)} aria-label={`Open ${s.title}`}
                className="group block w-full overflow-hidden p-2 text-left transition-transform duration-200 active:scale-[0.985] md:p-3">
                <div className={cn("relative overflow-hidden rounded-[var(--r-inner)] bg-black", s.wide ? "aspect-[16/8]" : "aspect-square")}>
                  <Image src={s.src} alt={s.title} fill sizes="(min-width:768px) 380px, 46vw"
                    className="ink object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>
                <p className="font-display mt-3 px-1 text-lg italic">{s.title}</p>
              </Glass>
            </li>
          </Reveal>
        ))}
        <Reveal className="list-none">
          <li className="glass-inner grid aspect-square place-items-center border-dashed p-5 text-center md:aspect-auto md:min-h-full">
            <p className="hand text-2xl text-[var(--paper-dim)]">my own pencil drawings are coming ✎</p>
          </li>
        </Reveal>
        {wide.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 0.06} className={cn("list-none", s.wide && "col-span-2 md:col-span-3")}>
            <li>
              <Glass as="button" onClick={() => setOpen(s)} aria-label={`Open ${s.title}`}
                className="group block w-full overflow-hidden p-2 text-left transition-transform duration-200 active:scale-[0.985] md:p-3">
                <div className={cn("relative overflow-hidden rounded-[var(--r-inner)] bg-black", s.wide ? "aspect-[16/8]" : "aspect-square")}>
                  <Image src={s.src} alt={s.title} fill sizes="(min-width:768px) 380px, 46vw"
                    className="ink object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>
                <p className="font-display mt-3 px-1 text-lg italic">{s.title}</p>
              </Glass>
            </li>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label={open.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-4 backdrop-blur-xl">
            <motion.figure initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.28, ease }} onClick={(e) => e.stopPropagation()} className="glass w-full max-w-3xl p-3 md:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--r-inner)] bg-black md:aspect-[16/10]">
                <Image src={open.src} alt={open.title} fill sizes="768px" className="ink object-contain" />
              </div>
              <figcaption className="flex items-start justify-between gap-4 p-3">
                <span><span className="font-display block text-2xl italic">{open.title}</span><span className="text-[var(--paper-dim)]">{open.caption}</span></span>
                <button onClick={() => setOpen(null)} className="min-h-11 shrink-0 rounded-full border border-[var(--line)] px-4 text-sm active:scale-[0.97]">Close</button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
