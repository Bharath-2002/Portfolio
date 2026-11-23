import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/profile";

const fills = ["bg-butter", "bg-lilac", "bg-sage", "bg-peach"];

export function Stats() {
  return (
    <section aria-label="Numbers" className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-4 md:gap-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.07}>
          <div className={`h-full rounded-[var(--r-card)] p-5 text-ink md:p-7 ${fills[i % fills.length]}`}>
            <p className="display-lg !text-[clamp(2.6rem,5.6vw,4.4rem)]">
              <CountUp value={s.value} decimals={s.decimals} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
            </p>
            <p className="pill mt-3 !text-[0.72rem]">{s.label}</p>
            <p className="mt-1 text-xs leading-snug text-ink/65">{s.note}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
