"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { socials } from "@/data/resume";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[calc(100svh-61px)] flex-col justify-center py-14 sm:min-h-[calc(100svh-73px)] sm:py-20">
      <motion.div
        className="relative max-w-2xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Availability badge */}
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium text-foreground">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mb-3 text-xs font-medium uppercase tracking-widest text-accent sm:text-sm"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {t.hero.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 bg-gradient-to-r from-accent to-violet-500 bg-clip-text text-xl font-semibold leading-snug text-transparent sm:text-3xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-3 min-[380px]:flex-row sm:mt-10 sm:flex-wrap sm:gap-4"
        >
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30"
          >
            {t.hero.cta}
          </a>
          <a
            href="#experience"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent"
          >
            {t.hero.secondaryCta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="mt-8 flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.icon === "email" ? undefined : "_blank"}
              rel={social.icon === "email" ? undefined : "noopener noreferrer"}
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              {SOCIAL_ICONS[social.icon]}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { delay: 1, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
