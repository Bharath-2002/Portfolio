/** Rich, slow colour field so the glass has something to refract. Compositor-only motion. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="orb h-[60vmax] w-[60vmax] md:h-[48vmax] md:w-[48vmax]"
        style={{
          top: "-18%", left: "-14%", background: "radial-gradient(circle, #ff5a2c, transparent 68%)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="orb h-[56vmax] w-[56vmax] md:h-[44vmax] md:w-[44vmax]"
        style={{
          bottom: "-22%", right: "-16%", background: "radial-gradient(circle, #b8421f, transparent 68%)",
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="orb hidden h-[34vmax] w-[34vmax] md:block"
        style={{
          top: "38%", left: "46%", opacity: 0.32, background: "radial-gradient(circle, #ffb347, transparent 68%)",
          animation: "drift-a 38s ease-in-out infinite reverse",
        }}
      />
      <div className="grain" />
    </div>
  );
}
