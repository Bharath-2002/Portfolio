import { Glass } from "@/components/ui/Glass";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/profile";

export function Stats() {
  return (
    <section aria-label="Numbers" className="mt-24 grid grid-cols-2 gap-3 md:mt-32 md:grid-cols-4 md:gap-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.07}>
          <Glass className="h-full p-5 md:p-7">
            <p className="display-lg !text-[clamp(2.2rem,5vw,3.6rem)]">
              <CountUp value={s.value} decimals={s.decimals} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
            </p>
            <p className="mt-2 text-sm font-medium">{s.label}</p>
            <p className="mt-1 text-xs leading-snug text-[var(--paper-dim)]">{s.note}</p>
          </Glass>
        </Reveal>
      ))}
    </section>
  );
}
