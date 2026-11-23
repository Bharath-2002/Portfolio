const DOTS = ["var(--accent)", "var(--sage)", "var(--lilac)", "var(--peach)"];

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden py-4"
      aria-hidden
    >
      <div className="flex w-max gap-10 whitespace-nowrap [animation:marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        {row.map((t, i) => (
          <span key={i} className="display-lg !text-[clamp(2.6rem,8vw,6.5rem)]">
            {t}
            <span className="ml-10 inline-block h-[0.2em] w-[0.2em] rounded-full align-middle" style={{ background: DOTS[i % DOTS.length] }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
