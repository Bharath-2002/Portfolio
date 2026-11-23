"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Glass } from "@/components/ui/Glass";
import type { Chapter } from "@/content/experience";
import { cn } from "@/lib/cn";

export function ChapterCard({ c, flip }: { c: Chapter; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rot = useTransform(scrollYProgress, [0, 1], [flip ? 4 : -4, flip ? -4 : 4]);

  return (
    <section ref={ref} id={c.id} className="relative scroll-mt-28 py-10 md:py-20">
      <div className="mb-8 flex items-end gap-4">
        <span className="font-display tnum text-7xl italic leading-none text-accent md:text-9xl">{c.index}</span>
        <div className="pb-2 md:pb-4">
          <p className="eyebrow">{c.period} · {c.mode}</p>
          <p className="mt-1 text-lg font-medium md:text-xl">{c.company} <span className="text-[var(--fg-dim)]">· {c.role}</span></p>
        </div>
      </div>

      <div className={cn("grid items-center gap-8 lg:grid-cols-2 lg:gap-14", flip && "lg:[&>*:first-child]:order-2")}>
        <motion.div style={{ y, rotate: rot }} className="ink relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
          <Image src={c.art} alt={`Chalk illustration for ${c.company}`} fill sizes="(min-width:1024px) 480px, 80vw" className="object-contain" />
        </motion.div>

        <div>
          <h2 className="display-lg !text-[clamp(2rem,4.6vw,3.6rem)]">{c.title}</h2>
          <p className="hand mt-3 text-2xl text-accent md:text-3xl">{c.aside}</p>
          <ul className="mt-8 space-y-3">
            {c.bullets.map((b, i) => (
              <motion.li key={b.lead} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.5, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}>
                <Glass className="glass-lite !rounded-[var(--r-inner)] p-4 md:p-5">
                  <p className="font-medium text-fg">{b.lead}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--fg-dim)] md:text-[0.95rem]">{b.text}</p>
                </Glass>
              </motion.li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <li key={t} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--fg-dim)]">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
