"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

const ITEMS = [
  {
    href: "/sobre",
    key: "about",
    position: "lg:col-start-1 lg:row-start-1 lg:self-start",
  },
  {
    href: "/trajetoria",
    key: "journey",
    position: "lg:col-start-3 lg:row-start-1 lg:self-start",
  },
  {
    href: "/projetos",
    key: "projects",
    position: "lg:col-start-1 lg:row-start-2 lg:self-center",
  },
  {
    href: "/universo-tech",
    key: "tech",
    position: "lg:col-start-3 lg:row-start-2 lg:self-center",
  },
  {
    href: "/alem-do-codigo",
    key: "beyond",
    position: "lg:col-start-1 lg:row-start-3 lg:self-end",
  },
  {
    href: "/contato",
    key: "contact",
    position: "lg:col-start-3 lg:row-start-3 lg:self-end",
  },
] as const;

export function HomeHub() {
  const { t } = useTranslation();

  return (
    <main className="home-grid relative mx-auto w-full max-w-[1728px] overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-9">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vw] max-h-[620px] w-[55vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.035] blur-3xl"
        aria-hidden="true"
      />

      <p className="relative mb-8 text-right text-[9px] font-medium uppercase tracking-[0.08em] text-muted lg:absolute lg:right-12 lg:top-9 lg:mb-0">
        {t.home.universe}
      </p>

      <div className="relative grid gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-[minmax(180px,1fr)_minmax(360px,1.6fr)_minmax(180px,1fr)] lg:grid-rows-3 lg:gap-x-8 lg:gap-y-4 lg:py-12 xl:grid-cols-[minmax(240px,1fr)_minmax(460px,1.6fr)_minmax(240px,1fr)] xl:gap-x-12">
        <div className="order-first col-span-full flex flex-col items-center justify-center py-7 text-center lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.08em] text-muted"
          ></motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-[clamp(4rem,10vw,9.5rem)] font-light leading-[0.82] tracking-[-0.075em] text-foreground"
          >
            Andressa
            <br />
            Ricardo<span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-7 max-w-md text-sm leading-relaxed text-muted sm:text-base"
          >
            {t.home.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
          >
            <span>Frontend</span>
            <span className="text-accent">•</span>
            <span>Mobile</span>
            <span className="text-accent">•</span>
            <span>Full stack</span>
          </motion.div>
        </div>

        {ITEMS.map(({ href, key, position }, index) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + index * 0.06 }}
            className={`${position} lg:w-full`}
          >
            <Link
              href={href}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/[0.035] lg:min-h-0 lg:border-transparent lg:p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-accent transition-colors group-hover:bg-white" />
              </span>
              <span className="min-w-0">
                <span className="mb-1 flex items-center gap-2 font-mono text-[9px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                  <span className="h-px w-3 bg-border transition-all group-hover:w-7 group-hover:bg-accent" />
                </span>
                <span className="block text-lg font-medium tracking-[-0.03em] text-foreground sm:text-xl">
                  {t.home.items[key]}
                </span>
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="ml-auto shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="relative mt-8 text-center text-[10px] text-muted lg:absolute lg:bottom-6 lg:right-12 lg:mt-0">
        {t.home.direction} <span className="ml-2 text-accent">↘</span>
      </p>
    </main>
  );
}
