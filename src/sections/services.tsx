"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

const SERVICE_IDS = ["mobile", "frontend", "automation", "scraping"] as const;

const SERVICE_ICONS: Record<(typeof SERVICE_IDS)[number], React.ReactNode> = {
  mobile: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="13" height="20" x="5.5" y="2" rx="2.5" />
      <path d="M10 5h4M12 18.5h.01" />
    </svg>
  ),
  frontend: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 8h20M6 5.5h.01M9 5.5h.01M8 13l-2 2 2 2M16 13l2 2-2 2" />
    </svg>
  ),
  automation: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h8l-1 8 9-12h-8l1-8Z" />
    </svg>
  ),
  scraping: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="8.5" ry="3" />
      <path d="M3.5 5v7c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3V5M3.5 12v7c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3v-7" />
    </svg>
  ),
};

const SERVICE_TAGS: Record<(typeof SERVICE_IDS)[number], string[]> = {
  mobile: ["React Native", "Expo", "TypeScript"],
  frontend: ["React", "Next.js", "TypeScript", "Landing Pages"],
  automation: ["Node.js", "Python", "Selenium"],
  scraping: ["Python", "Selenium", "APIs"],
};

export function Services() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-border py-16 sm:py-24"
    >
      <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end sm:mb-16">
        <div>
          <p className="mb-3 font-mono text-[9px] text-muted">
            {t.services.eyebrow}
          </p>
          <h2 className="text-2xl font-medium tracking-[-0.035em] text-foreground sm:text-3xl">
            {t.services.title}
            <span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-2xl font-mono text-xs leading-6 text-muted md:justify-self-end">
          {t.services.subtitle}
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border-l border-t border-border sm:grid-cols-2">
        {SERVICE_IDS.map((id, index) => {
          const item = t.services.items[id];
          return (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group relative min-h-[270px] border-b border-r border-border p-6 transition-colors hover:bg-foreground/[0.025] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[9px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all group-hover:border-foreground/30 group-hover:text-foreground">
                  {SERVICE_ICONS[id]}
                </span>
              </div>
              <h3 className="mt-7 max-w-sm text-lg font-medium tracking-[-0.025em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md font-mono text-xs leading-6 text-muted">
                {item.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SERVICE_TAGS[id].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[9px] text-muted transition-colors group-hover:border-foreground/25 group-hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
