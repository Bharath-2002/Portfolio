import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { nav, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="on-dark panel-rise mt-28 w-full bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] text-cream">
      <div className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24">
        <p className="hand text-3xl text-butter">thanks for scrolling →</p>
        <p className="display-xl mt-3">Let&apos;s build <span className="text-accent">something.</span></p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href={`mailto:${profile.email}`} variant="glass">Email me</ButtonLink>
          <a href={`mailto:${profile.email}`} className="text-[var(--fg-dim)] underline decoration-accent decoration-2 underline-offset-4 hover:text-fg">
            {profile.email}
          </a>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] pt-6 text-sm text-[var(--fg-dim)]">
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} className="hover:text-fg">{n.label}</Link></li>
          ))}
          <li><a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-fg">GitHub ↗</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">LinkedIn ↗</a></li>
        </ul>
        <p className="mt-6 pb-4 text-xs text-[var(--fg-faint)]">
          © {new Date().getFullYear()} {profile.name}. Drawn, coded and glassed by hand (and a little Nano Banana).
        </p>
      </div>
    </footer>
  );
}
