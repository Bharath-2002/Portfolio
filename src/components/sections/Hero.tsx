"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { ease } from "@/lib/cn";
import type { ReactNode } from "react";

const line = (i: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease },
});

/** Arch-shaped photo that sits inline in the headline, as on Jemini. */
function Chip({ src, bg, tilt = 0 }: { src: string; bg: string; tilt?: number }) {
  return (
    <span
      aria-hidden
      className="relative mx-[0.08em] inline-block h-[0.8em] w-[0.6em] translate-y-[0.02em] overflow-hidden rounded-t-full rounded-b-[0.14em] align-baseline"
      style={{ background: bg, transform: `rotate(${tilt}deg)` }}
    >
      <Image src={src} alt="" fill sizes="120px" className="object-cover object-top" />
    </span>
  );
}

const Line = ({ i, children }: { i: number; children: ReactNode }) => (
  <motion.span {...line(i)} className="block">{children}</motion.span>
);

export function Hero() {
  return (
    <section className="relative [overflow-x:clip] pb-14 md:pb-24">
      <motion.p {...line(0)} className="hand text-3xl text-accent md:text-4xl">hi, I&apos;m {profile.firstName}</motion.p>
      <h1 className="display-xl mt-2">
        <Line i={1}>I build <Chip src="/art/portrait.jpg" bg="var(--peach)" tilt={-3} /> brains</Line>
        <Line i={2}>for software<span className="text-accent">.</span></Line>
        <Line i={3}>
          <span className="text-accent">and</span> I draw <Chip src="/art/portrait-sketch.jpg" bg="var(--lilac)" tilt={3} />
        </Line>
      </h1>

      <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <motion.p {...line(5)} className="max-w-xl text-base leading-relaxed text-[var(--fg-dim)] md:text-lg">
          {profile.about}
        </motion.p>
        <motion.div {...line(6)} className="relative z-10 flex flex-wrap gap-3">
          <ButtonLink href="/story/" variant="ink">Read the story →</ButtonLink>
          <ButtonLink href="/lab/" variant="glass">Play in the lab</ButtonLink>
        </motion.div>
      </div>
      <motion.p {...line(7)} className="eyebrow mt-8">{profile.role} · {profile.location}</motion.p>

      <div aria-hidden className="blob pointer-events-none absolute right-[3%] top-[40%] hidden h-44 w-40 lg:block xl:h-56 xl:w-48" />
    </section>
  );
}
