"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { PortraitLens } from "@/components/interactive/PortraitLens";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { ease } from "@/lib/cn";

const line = (i: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease },
});

export function Hero() {
  return (
    <section className="relative grid items-center [overflow-x:clip] gap-10 lg:min-h-[78vh] lg:grid-cols-[1.25fr_1fr]">
      <Image src="/art/doodle-hero.webp" alt="" width={1400} height={788} loading="lazy"
        className="ink pointer-events-none absolute -right-10 -top-20 -z-10 w-[120%] max-w-none opacity-[0.16] md:-top-32 md:w-[75%]" />

      <div>
        <motion.p {...line(0)} className="hand text-2xl text-accent md:text-3xl">hi, I&apos;m</motion.p>
        <h1 className="display-xl mt-1">
          <motion.span {...line(1)} className="block">Bharath,</motion.span>
          <motion.span {...line(2)} className="block italic">
            I build <span className="scribble">brains</span>
          </motion.span>
          <motion.span {...line(3)} className="block">for software.</motion.span>
        </h1>
        <motion.p {...line(5)} className="mt-6 max-w-xl text-base leading-relaxed text-[var(--paper-dim)] md:text-lg">
          {profile.about}
        </motion.p>
        <motion.div {...line(6)} className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/story/">Read the story →</ButtonLink>
          <ButtonLink href="/lab/" variant="glass">Play in the lab</ButtonLink>
        </motion.div>
        <motion.p {...line(7)} className="eyebrow mt-8">
          {profile.role} · {profile.location}
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease }}>
        <div className="glass p-2.5 md:p-3">
          <PortraitLens />
        </div>
      </motion.div>
    </section>
  );
}
