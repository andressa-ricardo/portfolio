"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { education } from "@/data/resume";
import type { Locale } from "@/components/language-provider";

function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  present: string,
) {
  const format = (value: string) => {
    const date = new Date(`${value}-01`);
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return `${format(start)} — ${end ? format(end) : present}`;
}

export function Education() {
  const { t, locale } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = education[selectedIndex] ?? education[0];

  return (
    <section id="education" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
      <div className="mb-8 flex items-center justify-between gap-4 pb-4">
        <p className="text-lg font-medium tracking-[-0.03em] text-foreground sm:text-xl">
          <span className="text-accent"></span> {t.education.title}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
        <div
          className="border-l border-border pl-5 sm:pl-7"
          role="tablist"
          aria-orientation="vertical"
        >
          {education.map((item, index) => {
            const active = selectedIndex === index;
            return (
              <motion.button
                key={`${item.institution}-${item.period.start}`}
                type="button"
                role="tab"
                aria-selected={active}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedIndex(index)}
                className={`relative mb-2 w-full rounded-xl border border-border px-4 py-5 text-left transition-colors sm:px-5 ${active ? "bg-accent/10" : "hover:bg-foreground/[0.025]"}`}
              >
                {active && (
                  <span className="absolute -left-[29px] top-0 h-full w-px bg-accent sm:-left-[37px]" />
                )}
                <time className="text-[11px] text-muted">
                  {formatPeriod(
                    item.period.start,
                    item.period.end,
                    locale,
                    t.experience.present,
                  )}
                </time>
                <h3
                  className={`mt-3 text-base font-medium tracking-[-0.02em] transition-colors ${active ? "text-accent" : "text-foreground"}`}
                >
                  {item.institution}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {item.degree[locale]}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.article
                key={`${selected.institution}-${selected.period.start}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                    <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium tracking-[-0.035em] text-foreground sm:text-3xl">
                  {selected.field[locale]}
                </h2>
                <p className="mt-3 text-sm font-semibold text-accent">
                  {selected.institution}
                </p>
                <div className="mt-7 grid gap-3 border-y border-border py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-muted">
                      {t.education.degreeLabel}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {selected.degree[locale]}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-muted">
                      {t.education.periodLabel}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {formatPeriod(
                        selected.period.start,
                        selected.period.end,
                        locale,
                        t.experience.present,
                      )}
                    </p>
                  </div>
                </div>
                {selected.description && (
                  <p className="mt-7 max-w-2xl text-sm leading-7 text-muted">
                    {selected.description[locale]}
                  </p>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
