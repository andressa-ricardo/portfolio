"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import { ExperienceDetail } from "@/components/experience-detail";
import { MediaGallery } from "@/components/media-gallery";
import { experienceEntries, type ExperienceEntry } from "@/data/experience";
import type { Locale } from "@/components/language-provider";

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="font-mono text-xs leading-6 text-muted">{children}</p>
  ),
  ul: ({ children }) => <ul className="my-4 space-y-2">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 font-mono text-xs leading-6 text-muted">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const format = (value: string) => {
    const date = new Date(
      value.length === 7 ? `${value}-01` : `${value}-01-01`,
    );
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${format(start)} — ${end ? format(end) : presentLabel}`;
}

export function Projects() {
  const { t, locale } = useTranslation();
  const personalEntries = experienceEntries.filter(
    (entry) => entry.type === "personal",
  );
  const [selectedId, setSelectedId] = useState(personalEntries[0]?.id ?? "");
  const [mobileSelected, setMobileSelected] = useState<ExperienceEntry | null>(
    null,
  );
  const selected =
    personalEntries.find((entry) => entry.id === selectedId) ??
    personalEntries[0];

  const selectEntry = (entry: ExperienceEntry) => {
    setSelectedId(entry.id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileSelected(entry);
    }
  };

  return (
    <section id="projects" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
      <div className="mb-8 flex items-center justify-between gap-4 pb-4">
        <p className="text-base font-medium tracking-[-0.025em] text-foreground sm:text-lg">
          <span className="text-accent"></span> {t.projects.title}
        </p>
      </div>

      <div className="grid gap-10 lg:h-[68svh] lg:min-h-[520px] lg:max-h-[720px] lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
        <div
          className="custom-scrollbar border-l border-border pl-5 sm:pl-7 lg:h-full lg:overflow-y-auto lg:pr-3"
          role="tablist"
          aria-orientation="vertical"
          tabIndex={0}
        >
          {personalEntries.map((entry, index) => {
            const active = selected?.id === entry.id;
            return (
              <motion.button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={active}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => selectEntry(entry)}
                className={`relative mb-2 w-full rounded-xl border border-border px-4 py-5 text-left transition-colors sm:px-5 ${active ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.025]"}`}
              >
                {active && (
                  <span className="absolute -left-[29px] top-0 h-full w-px bg-foreground/40 sm:-left-[37px]" />
                )}
                <time className="text-[11px] text-muted">
                  {formatPeriod(
                    entry.period.start,
                    entry.period.end,
                    locale,
                    t.experience.present,
                  )}
                </time>
                <h3 className="mt-3 text-base font-medium tracking-[-0.025em] text-foreground">
                  {entry.company}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {entry.role[locale]}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div
          className="custom-scrollbar hidden min-w-0 lg:block lg:h-full lg:overflow-y-auto lg:pr-3"
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            {selected && (
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">
                  {selected.company}
                </h2>
                <p className="mt-3 font-mono text-xs font-medium text-foreground">
                  {selected.role[locale]}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border-b border-accent/45 pb-1 font-mono text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {selected.overview && (
                  <div className="mt-8 border-t border-border pt-7">
                    <h3 className="mb-3 text-[10px] uppercase tracking-[0.08em] text-muted">
                      {t.experience.overview}
                    </h3>
                    <div className="space-y-4">
                      <ReactMarkdown components={markdownComponents}>
                        {selected.overview[locale]}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                <div className="mt-7 border-t border-border pt-7">
                  <h3 className="mb-3 text-[10px] uppercase tracking-[0.08em] text-muted">
                    {t.experience.contribution}
                  </h3>
                  <div className="space-y-4">
                    <ReactMarkdown components={markdownComponents}>
                      {selected.fullDescription[locale]}
                    </ReactMarkdown>
                  </div>
                </div>

                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {t.experience.visitSite} <span aria-hidden="true">↗</span>
                  </a>
                )}

                {selected.media.length > 0 && (
                  <div className="mt-9 border-t border-border pt-7">
                    <h3 className="mb-4 text-[10px] uppercase tracking-[0.08em] text-muted">
                      {t.experience.gallery}
                    </h3>
                    <MediaGallery items={selected.media} />
                  </div>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>

      {mobileSelected && (
        <ExperienceDetail
          entry={mobileSelected}
          onClose={() => setMobileSelected(null)}
        />
      )}
    </section>
  );
}
