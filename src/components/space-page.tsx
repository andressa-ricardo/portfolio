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
        className="border-b border-border py-8 sm:py-10"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            aria-label={t.home.backHome}
            title={t.home.backHome}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <span className="font-mono text-[10px] text-accent">{number}</span>
          <h1 className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
            {content.title}
            <span className="text-accent">.</span>
          </h1>
        </div>
      </motion.header>
      {children}
    </main>
  );
}
