export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max gap-10 whitespace-nowrap [animation:marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        {row.map((t, i) => (
          <span key={i} className="font-display text-3xl italic text-[var(--paper-dim)] md:text-5xl">
            {t}
            <span className="ml-10 text-accent not-italic">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
