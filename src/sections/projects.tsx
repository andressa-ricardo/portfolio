"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceDetail } from "@/components/experience-detail";
import {
  experienceEntries,
  TYPE_BADGE,
  type ExperienceEntry,
} from "@/data/experience";
import type { Locale } from "@/components/language-provider";

function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const fmt = (d: string) => {
    const date = new Date(d.length === 7 ? d + "-01" : d + "-01-01");
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return `${fmt(start)} - ${end ? fmt(end) : presentLabel}`;
}

export function Projects() {
  const { t, locale } = useTranslation();
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  const personalEntries = experienceEntries.filter(
    (entry) => entry.type === "personal",
  );

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.projects.title}</SectionHeading>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="-mt-4 mb-10 max-w-2xl text-base leading-relaxed text-muted sm:mb-12 sm:text-lg"
      >
        {t.projects.subtitle}
      </motion.p>

      <div className="space-y-4">
        {personalEntries.map((entry, i) => (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => setSelected(entry)}
            className="group w-full rounded-2xl border border-border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 sm:p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {entry.role[locale]}
                  </h3>
                </div>
                <p className="mt-1 pl-5.5 text-sm font-medium text-accent">
                  {entry.company}
                </p>

                <p className="mt-2.5 pl-5.5 text-sm leading-relaxed text-muted">
                  {entry.shortDescription[locale]}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 pl-5.5">
                  {entry.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                  {entry.technologies.length > 4 && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      +{entry.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pl-5.5 sm:flex-col sm:items-end sm:pl-0">
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[entry.type]}`}
                >
                  {t.experience.types[entry.type]}
                </span>

                <time className="shrink-0 text-xs text-muted sm:text-sm">
                  {formatPeriod(
                    entry.period.start,
                    entry.period.end,
                    locale,
                    t.experience.present,
                  )}
                </time>

                {entry.media.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    {entry.media.length}
                  </div>
                )}

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selected && (
        <ExperienceDetail entry={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
