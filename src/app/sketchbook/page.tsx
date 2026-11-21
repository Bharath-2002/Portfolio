import type { Metadata } from "next";
import { SketchGallery } from "@/components/sections/SketchGallery";
import { DrawingPad } from "@/components/interactive/DrawingPad";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Sketchbook" };

export default function SketchbookPage() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="eyebrow mb-4">Sketchbook</p>
        <h1 className="display-xl !text-[clamp(2.8rem,9vw,7rem)]">
          Ink, chalk and <em>curiosity.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--paper-dim)]">
          Chalk-and-ink studies of the things I think about while code compiles. These were made with Nano Banana 2.1 and art-directed by me; my own pencil drawings join them soon. Tap any drawing to look closer.
        </p>
      </header>
      <SketchGallery />
      <section className="mt-24 md:mt-32">
        <Reveal className="mb-6">
          <p className="eyebrow mb-3">Your turn</p>
          <h2 className="display-lg !text-[clamp(1.8rem,4vw,3rem)] italic">Doodle on my wall.</h2>
        </Reveal>
        <Reveal><DrawingPad /></Reveal>
      </section>
    </>
  );
}
