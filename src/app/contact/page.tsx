import type { Metadata } from "next";
import { DrawingPad } from "@/components/interactive/DrawingPad";
import { ButtonLink } from "@/components/ui/Button";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "Bharath-2002", href: profile.github },
  { label: "LinkedIn", value: "bharath-s-b58875420", href: profile.linkedin },
];

export default function ContactPage() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="display-xl !text-[clamp(2.8rem,9vw,7rem)]">
          Say <em>hello.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[var(--fg-dim)]">
          Building GenAI products, agents or a queue that refuses to die? I&apos;m in {profile.location}, and I answer email.
        </p>
      </header>

      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.07}>
            <Glass as="li" className="group list-none transition-transform duration-200 hover:-translate-y-1">
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block min-h-11 p-6">
                <p className="eyebrow">{c.label}</p>
                <p className="mt-3 break-all text-lg font-medium">{c.value}</p>
                <p className="mt-4 text-sm text-accent">Open ↗</p>
              </a>
            </Glass>
          </Reveal>
        ))}
      </ul>

      <section className="mt-20 md:mt-28">
        <Reveal className="mb-6">
          <p className="hand text-3xl text-accent">prefer pictures?</p>
          <h2 className="display-lg !text-[clamp(1.8rem,4vw,3rem)] italic">Draw me a message.</h2>
          <p className="mt-2 max-w-xl text-[var(--fg-dim)]">Sketch it, save the PNG, attach it to an email. Best subject line I&apos;ll get all week.</p>
        </Reveal>
        <Reveal><DrawingPad height={320} /></Reveal>
        <div className="mt-6"><ButtonLink href={`mailto:${profile.email}?subject=Hello%20Bharath`}>Write the email →</ButtonLink></div>
      </section>
    </>
  );
}
