"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import { MediaGallery } from "@/components/media-gallery";
import { TYPE_BADGE, type ExperienceEntry } from "@/data/experience";

interface Props {
  entry: ExperienceEntry;
  onClose: () => void;
}

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="font-mono text-xs leading-6 text-muted">{children}</p>
  ),
  ul: ({ children }) => <ul className="my-5 space-y-2.5 pl-1">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 font-mono text-xs leading-6 text-muted">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35" />
      <span className="min-w-0">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

export function ExperienceDetail({ entry, onClose }: Props) {
  const { locale, t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        key="exp-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        key="exp-panel"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="custom-scrollbar fixed bottom-0 right-0 top-0 z-91 w-full overflow-y-auto bg-background shadow-2xl sm:w-135 lg:w-150"
      >
        <div className="p-5 sm:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/[0.05]"
            aria-label="Fechar"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[10px] font-medium text-muted">
                {entry.company}
              </p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[entry.type]}`}
              >
                {t.experience.types[entry.type]}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {entry.role[locale]}
            </h3>
            <p className="mt-1 font-mono text-[10px] text-muted">
              {formatPeriod(
                entry.period.start,
                entry.period.end,
                locale,
                t.experience.present,
              )}
            </p>
          </div>

          {/* Overview — what the project is */}
          {entry.overview && (
            <div className="mb-6">
              <h4 className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {t.experience.overview}
              </h4>
              <div className="rounded-2xl border border-border/70 bg-foreground/[0.015] p-5 sm:p-6">
                <div className="space-y-4">
                  <ReactMarkdown components={markdownComponents}>
                    {entry.overview[locale]}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Description — my work on it */}
          <div className="mb-8">
            {entry.overview && (
              <h4 className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {t.experience.contribution}
              </h4>
            )}
            <div className="rounded-2xl border border-border/70 bg-foreground/[0.015] p-5 sm:p-6">
              <div className="space-y-4">
                <ReactMarkdown components={markdownComponents}>
                  {entry.fullDescription[locale]}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
              {t.experience.technologies}
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[9px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Link */}
          {entry.link && (
            <div className="mb-8">
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[10px] text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
              >
                {t.experience.visitSite}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          )}

          {entry.storeLinks && (
            <div className="mb-8">
              <h4 className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {t.experience.downloadApp}
              </h4>
              <div className="flex flex-wrap gap-3">
                {entry.storeLinks.apple && (
                  <a
                    href={entry.storeLinks.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
                  >
                    App Store <span aria-hidden="true">↗</span>
                  </a>
                )}
                {entry.storeLinks.android && (
                  <a
                    href={entry.storeLinks.android}
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

          {/* Gallery */}
          {entry.media.length > 0 && (
            <div>
              <h4 className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {t.experience.gallery}
              </h4>
              <MediaGallery items={entry.media} />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function formatPeriod(
  start: string,
  end: string | null,
  locale: string,
  presentLabel: string,
) {
  const fmt = (d: string) => {
    const date = new Date(d.length === 7 ? d + "-01" : d + "-01-01");
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(start)} — ${end ? fmt(end) : presentLabel}`;
}
