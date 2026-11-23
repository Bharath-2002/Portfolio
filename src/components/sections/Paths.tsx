"use client";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const paths = [
  { href: "/story/", n: "01", title: "The story", text: "Three jobs told as three chapters, with drawings.", span: "md:col-span-2", fill: "bg-butter" },
  { href: "/work/", n: "02", title: "Work", text: "Side projects in a coverflow you can fling.", span: "", fill: "bg-lilac" },
  { href: "/lab/", n: "03", title: "The lab", text: "Crash a job queue. Pull apart a poster. Pierce an ear.", span: "", fill: "bg-sage" },
  { href: "/sketchbook/", n: "04", title: "Sketchbook", text: "Ink studies, plus a canvas to draw on.", span: "md:col-span-2", fill: "bg-peach" },
];

export function Paths() {
  return (
    <section className="mt-28 md:mt-40">
      <SectionHeading eyebrow="Pick a path" note="(there's no wrong door)">
        Choose your <em>own</em> adventure.
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-3">
        {paths.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.06} className={p.span}>
            <Link href={p.href} className={`group relative flex h-full min-h-52 flex-col justify-between rounded-[var(--r-card)] p-6 text-ink transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99] md:p-8 ${p.fill}`}>
              <span className="tnum eyebrow !text-ink/60">{p.n}</span>
              <div>
                <h3 className="display-lg !text-[clamp(2.2rem,4.4vw,3.4rem)]">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.text}</p>
              </div>
              <span aria-hidden className="absolute right-6 top-5 text-2xl text-ink transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
