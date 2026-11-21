import type { Metadata } from "next";
import { Coverflow } from "@/components/interactive/Coverflow";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="eyebrow mb-4">Projects · from GitHub</p>
        <h1 className="display-xl !text-[clamp(2.8rem,9vw,7rem)]">
          Things I <em>made</em> after hours.
        </h1>
        <p className="hand mt-4 text-2xl text-accent md:text-3xl">swipe, scroll, or use ← →</p>
      </header>

      <div className="mt-8"><Coverflow items={projects} /></div>

      <section className="mt-24" aria-label="All projects">
        <p className="eyebrow mb-6">The full list</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.06}>
              <Glass as="li" className="!rounded-[var(--r-inner)]">
                <a href={p.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-4 p-5">
                  <span>
                    <span className="block font-medium">{p.title}</span>
                    <span className="block text-sm text-[var(--paper-dim)]">{p.stack.join(" · ")}</span>
                  </span>
                  <span className="tnum shrink-0 text-sm text-[var(--paper-faint)]">{p.year} ↗</span>
                </a>
              </Glass>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
