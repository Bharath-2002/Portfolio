"use client";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex min-h-11 whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 pill transition-[transform,background-color,border-color] duration-150 ease-out active:scale-[0.97] select-none";
const variants = {
  primary: "bg-accent text-cream hover:bg-[#f56b47]",
  glass: "bg-butter text-ink hover:bg-[#ffe98f]",
  lilac: "bg-lilac text-ink hover:bg-[#dcbddc]",
  ink: "bg-ink text-cream hover:bg-[#1d241c]",
  ghost: "border border-[var(--line)] hover:border-fg/40 hover:bg-fg/5",
} as const;

type Common = { variant?: keyof typeof variants; children: ReactNode; className?: string };

export function ButtonLink({
  variant = "primary",
  className,
  href,
  children,
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }) {
  const cls = cn(base, variants[variant], className);
  const external = /^(https?:|mailto:)/.test(href);
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Common & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
