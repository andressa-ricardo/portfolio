"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";

const SERVICE_IDS = ["mobile", "frontend", "automation", "scraping"] as const;

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  mobile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="3" />
      <path d="M12 18h.01" />
    </svg>
  ),
  frontend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  automation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  scraping: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </svg>
  ),
};

const SERVICE_TAGS: Record<string, string[]> = {
  mobile: ["React Native", "Expo", "TypeScript"],
  frontend: ["React", "Next.js", "TypeScript", "Landing Pages"],
  automation: ["Node.js", "Python", "Selenium"],
  scraping: ["Python", "Selenium", "APIs"],
};

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.services.title}</SectionHeading>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="-mt-4 mb-10 max-w-xl text-base leading-relaxed text-muted sm:mb-12 sm:text-lg"
      >
        {t.services.subtitle}
      </motion.p>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {SERVICE_IDS.map((id, i) => {
          const item = t.services.items[id];

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-foreground/2 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 sm:p-7"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Index number */}
              <span className="pointer-events-none absolute right-5 top-4 text-5xl font-bold leading-none text-foreground/5 transition-colors duration-300 group-hover:text-accent/15">
                0{i + 1}
              </span>

              <div className="relative">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent ring-1 ring-accent/15 transition-all duration-300 group-hover:from-accent group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/30 group-hover:ring-accent/40">
                  {SERVICE_ICONS[id]}
                </div>

                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>

                {/* Tech tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {SERVICE_TAGS[id].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-accent/25 group-hover:text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
