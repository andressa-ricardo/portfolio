"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import { MediaGallery } from "@/components/media-gallery";
import { ExperienceDetail } from "@/components/experience-detail";
import {
  experienceEntries,
  type ExperienceEntry,
  type ExperienceType,
} from "@/data/experience";
import type { Locale } from "@/components/language-provider";

type Filter = Exclude<ExperienceType, "personal"> | "all";

const FILTERS: Filter[] = ["all", "fulltime", "freelance"];

const markdownComponents: Components = {
  p: ({ children }) => <p className="leading-7 text-muted">{children}</p>,
  ul: ({ children }) => <ul className="my-4 space-y-2">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 leading-7 text-muted">
      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
      <div className="mb-8 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] text-accent">
            01 — {t.experience.title}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {t.experience.timelineIntro}
          </p>
        </div>
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
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                filter === key
                  ? "bg-accent text-white"
                  : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {filterLabel(key)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:h-[68svh] lg:min-h-[520px] lg:max-h-[720px] lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
        <div
          className="scrollbar-hidden border-l border-border pl-5 sm:pl-7 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pr-3"
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
                className={`relative w-full border-b border-border px-4 py-5 text-left transition-colors sm:px-5 ${
                  active ? "bg-accent/10" : "hover:bg-foreground/[0.025]"
                }`}
              >
                {active && (
                  <span className="absolute -left-[29px] top-0 h-full w-px bg-accent sm:-left-[37px]" />
                )}
                <time className="text-[11px] text-muted">
                  {formatPeriod(
                    entry.period.start,
                    entry.period.end,
                    locale,
                    t.experience.present,
                  )}
                </time>
                <h3
                  className={`mt-3 text-lg font-medium tracking-[-0.025em] transition-colors ${active ? "text-accent" : "text-foreground"}`}
                >
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
          className="scrollbar-hidden hidden min-w-0 lg:block lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pr-3"
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
                <p className="font-mono text-[10px] uppercase text-muted">
                  {String(
                    filtered.findIndex((entry) => entry.id === selected.id) + 1,
                  ).padStart(2, "0")}{" "}
                  /{" "}
                  {formatPeriod(
                    selected.period.start,
                    selected.period.end,
                    locale,
                    t.experience.present,
                  )}
                </p>
                <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
                  {selected.company}
                </h2>
                <p className="mt-4 text-base font-semibold text-foreground">
                  {selected.role[locale]}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border-b border-accent/70 pb-1 text-xs text-muted"
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
                    <div className="space-y-4 text-sm">
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
                  <div className="space-y-4 text-sm">
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
                    className="mt-7 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
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
                          className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-white"
                        >
                          App Store <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {selected.storeLinks.android && (
                        <a
                          href={selected.storeLinks.android}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-white"
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
