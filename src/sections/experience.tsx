"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import { MediaGallery } from "@/components/media-gallery";
import { ExperienceDetail } from "@/components/experience-detail";
import {
  experienceEntries,
  TYPE_BADGE,
  type ExperienceEntry,
  type ExperienceType,
} from "@/data/experience";
import type { Locale } from "@/components/language-provider";

type Filter = Exclude<ExperienceType, "personal"> | "all";

const FILTERS: Filter[] = ["all", "fulltime", "freelance"];

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

export function Experience() {
  const { t, locale } = useTranslation();
  const professionalEntries = experienceEntries.filter(
    (entry) => entry.type !== "personal",
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(
    professionalEntries[0]?.id ?? "",
  );
  const [mobileSelected, setMobileSelected] = useState<ExperienceEntry | null>(
    null,
  );

  const filtered =
    filter === "all"
      ? professionalEntries
      : professionalEntries.filter((entry) => entry.type === filter);
  const selected =
    filtered.find((entry) => entry.id === selectedId) ?? filtered[0];

  const selectFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    const first =
      nextFilter === "all"
        ? professionalEntries[0]
        : professionalEntries.find((entry) => entry.type === nextFilter);
    if (first) setSelectedId(first.id);
  };

  const filterLabel = (key: Filter) =>
    key === "all" ? t.experience.filterAll : t.experience.types[key];

  const selectEntry = (entry: ExperienceEntry) => {
    setSelectedId(entry.id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileSelected(entry);
    }
  };

  return (
    <section id="experience" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4">
        <p className="text-base font-medium tracking-[-0.025em] text-foreground sm:text-lg">
          <span className="text-accent"></span> {t.experience.title}
        </p>
        <div
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label={t.experience.filterLabel}
        >
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => selectFilter(key)}
              className={`rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.04em] transition-colors ${
                filter === key
                  ? "border-foreground/20 bg-foreground/[0.06] text-foreground"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {filterLabel(key)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:h-[68svh] lg:min-h-[520px] lg:max-h-[720px] lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
        <div
          className="custom-scrollbar border-l border-border pl-5 sm:pl-7 lg:h-full lg:overflow-y-auto lg:pr-3"
          role="tablist"
          aria-orientation="vertical"
          tabIndex={0}
        >
          {filtered.map((entry, index) => {
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
                className={`relative mb-2 w-full rounded-xl border border-border px-4 py-5 text-left transition-colors sm:px-5 ${
                  active
                    ? "bg-foreground/[0.05]"
                    : "hover:bg-foreground/[0.025]"
                }`}
              >
                {active && (
                  <span className="absolute -left-[29px] top-0 h-full w-px bg-foreground/40 sm:-left-[37px]" />
                )}
                <time className="font-mono text-[9px] text-muted">
                  {formatPeriod(
                    entry.period.start,
                    entry.period.end,
                    locale,
                    t.experience.present,
                  )}
                </time>
                <h3 className="mt-3 text-sm font-medium tracking-[-0.02em] text-foreground">
                  {entry.company}
                </h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[10px] leading-5 text-muted">
                    {entry.role[locale]}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${TYPE_BADGE[entry.type]}`}
                  >
                    {t.experience.types[entry.type]}
                  </span>
                </div>
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

                {selected.storeLinks && (
                  <div className="mt-7">
                    <h3 className="mb-3 text-[10px] uppercase tracking-[0.08em] text-muted">
                      {t.experience.downloadApp}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selected.storeLinks.apple && (
                        <a
                          href={selected.storeLinks.apple}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
                        >
                          App Store <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {selected.storeLinks.android && (
                        <a
                          href={selected.storeLinks.android}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
                        >
                          Google Play <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
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
