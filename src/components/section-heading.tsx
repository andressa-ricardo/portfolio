"use client";

import { motion } from "framer-motion";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:mb-12 sm:text-3xl"
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-2 block h-1 w-12 origin-left rounded-full bg-gradient-to-r from-accent to-violet-500"
      />
    </motion.h2>
  );
}
