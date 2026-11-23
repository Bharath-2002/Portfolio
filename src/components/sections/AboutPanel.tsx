import { PortraitLens } from "@/components/interactive/PortraitLens";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Full-bleed vermilion panel that rises under the hero. */
export function AboutPanel() {
  return (
    <section className="panel-rise relative left-1/2 -ml-[50vw] w-screen bg-accent text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <Reveal>
          <div className="rounded-[var(--r-card)] bg-cream p-2.5 shadow-[0_30px_60px_-30px_rgb(16_20_15/0.6)] md:p-3">
            <PortraitLens />
          </div>
          <p className="hand mt-4 text-2xl text-butter">drag across me, I turn into a sketch</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow !text-cream/80">✿ The short version</p>
          <h2 className="display-lg mt-4">
            GenAI that survives production. <span className="text-butter">Then a drawing about it.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/work/" variant="glass">See the work</ButtonLink>
            <ButtonLink href="/sketchbook/" variant="lilac">Open the sketchbook</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
