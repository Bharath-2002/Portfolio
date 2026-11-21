"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, profile } from "@/content/profile";
import { cn, ease } from "@/lib/cn";

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <nav
          aria-label="Primary"
          className="glass relative flex w-full max-w-3xl items-center justify-between !rounded-full py-1.5 pl-5 pr-1.5 md:pr-2"
        >
          <Link href="/" className="font-display text-lg italic tracking-tight" aria-label="Home">
            {profile.firstName}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm transition-colors duration-150",
                    active(n.href) ? "text-ink" : "text-[var(--paper-dim)] hover:text-paper",
                  )}
                >
                  {active(n.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-paper"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
                    />
                  )}
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={cn("absolute left-0 top-0 h-px w-5 bg-paper transition-transform duration-200", open && "translate-y-[6px] rotate-45")} />
              <span className={cn("absolute left-0 top-[11px] h-px w-5 bg-paper transition-transform duration-200", open && "-translate-y-[5px] -rotate-45")} />
            </span>
          </button>

          <motion.span
            style={{ scaleX: progress }}
            className="absolute -bottom-px left-6 right-6 h-px origin-left bg-accent"
            aria-hidden
          />
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-2xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease }}
                >
                  <Link
                    href={n.href}
                    className={cn(
                      "display-lg block py-1 italic",
                      active(n.href) ? "text-accent" : "text-paper",
                    )}
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
