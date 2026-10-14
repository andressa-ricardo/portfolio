"use client";

import { motion } from "framer-motion";
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

  return (
    <section id="education" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
      <div className="mb-8 flex items-center justify-between gap-4 pb-4">
        <p className="text-base font-medium tracking-[-0.025em] text-foreground sm:text-lg">
          <span className="text-accent"></span> {t.education.title}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {education.map((item, index) => (
          <motion.article
            key={`${item.institution}-${item.period.start}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-2xl border border-border p-5 sm:p-6"
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted">
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
            <h2 className="text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">
              {item.field[locale]}
            </h2>
            <p className="mt-3 font-mono text-xs font-medium text-foreground">
              {item.institution}
            </p>
            <div className="mt-7 grid gap-3 border-y border-border py-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.08em] text-muted">
                  {t.education.degreeLabel}
                </p>
                <p className="mt-2 font-mono text-xs text-foreground">
                  {item.degree[locale]}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.08em] text-muted">
                  {t.education.periodLabel}
                </p>
                <p className="mt-2 font-mono text-xs text-foreground">
                  {formatPeriod(
                    item.period.start,
                    item.period.end,
                    locale,
                    t.experience.present,
                  )}
                </p>
              </div>
            </div>
            {item.description && (
              <p className="mt-6 font-mono text-xs leading-6 text-muted">
                {item.description[locale]}
              </p>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
