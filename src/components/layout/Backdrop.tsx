/** Cream paper with a soft peach / pink wash (Jemini) and a touch of grain. Compositor-only motion. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="orb h-[56vmax] w-[56vmax] md:h-[44vmax] md:w-[44vmax]"
        style={{
          top: "-20%", right: "-16%", opacity: 0.55, background: "radial-gradient(circle, #f7cdb8, transparent 68%)",
          animation: "drift-a 30s ease-in-out infinite",
        }}
      />
      <div
        className="orb h-[50vmax] w-[50vmax] md:h-[40vmax] md:w-[40vmax]"
        style={{
          bottom: "-24%", left: "-16%", opacity: 0.5, background: "radial-gradient(circle, #e8d2e6, transparent 68%)",
          animation: "drift-b 36s ease-in-out infinite",
        }}
      />
      <div className="grain" />
    </div>
  );
}
