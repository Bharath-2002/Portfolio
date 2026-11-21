import Link from "next/link";
import { nav, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mx-auto mt-32 w-full max-w-6xl px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8">
      <div className="glass flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-10">
        <div>
          <p className="hand text-3xl text-accent">thanks for scrolling →</p>
          <p className="display-lg mt-2 italic">Let&apos;s build something.</p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-[var(--paper-dim)] underline decoration-accent decoration-2 underline-offset-4 hover:text-paper">
            {profile.email}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--paper-dim)]">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="hover:text-paper">{n.label}</Link>
            </li>
          ))}
          <li><a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-paper">GitHub ↗</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-paper">LinkedIn ↗</a></li>
        </ul>
      </div>
      <p className="mt-6 text-center text-xs text-[var(--paper-faint)]">
        © {new Date().getFullYear()} {profile.name}. Drawn, coded and glassed by hand (and a little Nano Banana).
      </p>
    </footer>
  );
}
