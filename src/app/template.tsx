"use client";
import { motion } from "motion/react";

/** Route enter: a calm fade+rise. Re-mounts per navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="mx-auto w-full max-w-6xl px-5 pb-8 pt-28 md:px-8 md:pt-36"
    >
      {children}
    </motion.main>
  );
}
