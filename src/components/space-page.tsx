"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

type SpaceKey =
  | "about"
  | "journey"
  | "projects"
  | "tech"
  | "beyond"
  | "contact";

export function SpacePage({
  space,
  number,
  children,
}: {
  space: SpaceKey;
  number: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const content = t.spaces[space];

  return (
    <main className="mx-auto min-h-[calc(100svh-156px)] w-full max-w-5xl px-5 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="border-b border-border pb-8 pt-10 sm:pb-12 sm:pt-16"
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> {t.home.backHome}
        </Link>
        <div className="flex items-start gap-4 sm:gap-7">
          <span className="pt-2 font-mono text-[10px] text-accent">
            {number}
          </span>
          <div>
            <h1 className="text-4xl font-light tracking-[-0.05em] text-foreground sm:text-6xl">
              {content.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {content.description}
            </p>
          </div>
        </div>
      </motion.header>
      {children}
    </main>
  );
}
