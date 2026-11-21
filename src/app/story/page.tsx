import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ChapterCard } from "@/components/sections/ChapterCard";
import { Reveal } from "@/components/ui/Reveal";
import { chapters } from "@/content/experience";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Story" };

export default function StoryPage() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="eyebrow mb-4">The story so far</p>
        <h1 className="display-xl !text-[clamp(2.8rem,9vw,7rem)]">
          Three jobs, <em>one</em> plot.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--paper-dim)]">{profile.longAbout}</p>
        <nav aria-label="Chapters" className="mt-8 flex flex-wrap gap-2">
          {chapters.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="glass inline-flex min-h-11 items-center gap-2 !rounded-full px-4 text-sm">
              <span className="tnum text-accent">{c.index}</span> {c.company}
            </a>
          ))}
        </nav>
      </header>

      <div className="mt-10 md:mt-16">
        {chapters.map((c, i) => (
          <ChapterCard key={c.id} c={c} flip={i % 2 === 1} />
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="hand text-3xl text-accent">to be continued…</p>
        <p className="display-lg mt-2 italic">Next chapter: yours?</p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/work/">See side projects</ButtonLink>
          <ButtonLink href="/contact/" variant="glass">Say hi</ButtonLink>
        </div>
      </Reveal>
    </>
  );
}
