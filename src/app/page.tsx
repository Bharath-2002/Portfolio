import { Marquee } from "@/components/ui/Marquee";
import { AboutPanel } from "@/components/sections/AboutPanel";
import { Hero } from "@/components/sections/Hero";
import { Paths } from "@/components/sections/Paths";
import { Stats } from "@/components/sections/Stats";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillConstellation } from "@/components/interactive/SkillConstellation";
import { statements } from "@/content/profile";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPanel />
      <div className="mt-14 md:mt-20"><Marquee items={statements} /></div>
      <Stats />
      <Paths />
      <section className="mt-28 md:mt-40">
        <SectionHeading eyebrow="Toolbox" note="poke the stars, they move">
          What I reach for <em>first.</em>
        </SectionHeading>
        <Reveal><SkillConstellation /></Reveal>
      </section>
    </>
  );
}
