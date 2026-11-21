import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  children,
  note,
}: {
  eyebrow: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="display-lg max-w-[18ch]">{children}</h2>
      {note && <p className="hand mt-4 text-2xl text-accent md:text-3xl">{note}</p>}
    </Reveal>
  );
}
