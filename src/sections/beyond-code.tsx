"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import {
  booksRead,
  currentMoments,
  favoriteSongs,
  personalInterests,
  readingList,
  type ShelfBook,
} from "@/data/beyond";

type Tab = "spotify" | "shelf" | "interests" | "current";

const TABS: Tab[] = ["spotify", "shelf", "interests", "current"];

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-5 py-7 font-mono text-xs leading-6 text-muted">
      {children}
    </div>
  );
}

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <span className="flex gap-1" aria-label={`${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          className={star <= rating ? "text-foreground/70" : "text-border"}
          aria-hidden="true"
        >
          <path d="m12 2.5 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.32l-5.8 3.05 1.11-6.47-4.7-4.58 6.49-.94L12 2.5Z" />
        </svg>
      ))}
    </span>
  );
}

function BookGrid({
  items,
  empty,
  locale,
}: {
  items: ShelfBook[];
  empty: string;
  locale: "pt" | "en";
}) {
  if (items.length === 0) return <EmptyState>{empty}</EmptyState>;

  const tilts = [
    "-rotate-[1deg]",
    "rotate-[0.6deg]",
    "-rotate-[0.4deg]",
    "rotate-[1deg]",
  ];

  return (
    <div>
      <div className="custom-scrollbar flex items-end gap-2 overflow-x-auto px-3 pb-3 pt-5 sm:gap-3">
        {items.map((book, index) => (
          <article
            key={`${book.title.pt}-${book.author}`}
            tabIndex={0}
            aria-label={`${book.title[locale]}, ${book.author}`}
            className={`group relative w-[108px] shrink-0 origin-bottom transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 focus-visible:-translate-y-2 focus-visible:rotate-0 sm:w-[124px] ${tilts[index % tilts.length]}`}
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-r-md border border-border bg-foreground/[0.025] shadow-[5px_8px_18px_rgba(0,0,0,0.18)]">
              {book.cover && (
                <img
                  src={book.cover}
                  alt={`${locale === "pt" ? "Capa de" : "Cover of"} ${book.title[locale]}`}
                  className="h-full w-full object-contain"
                />
              )}
              <span
                className="absolute inset-y-0 left-0 w-1.5 border-r border-black/20 bg-black/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/90 px-2 py-2 backdrop-blur-sm">
                <h4 className="truncate text-[10px] font-medium text-foreground">
                  {book.title[locale]}
                </h4>
                <p className="mt-0.5 truncate font-mono text-[8px] text-muted">
                  {book.author}
                </p>
                {book.rating && (
                  <div className="mt-1.5 scale-90 origin-left">
                    <Stars rating={book.rating} />
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div
        className="relative h-4 rounded-sm border border-border bg-foreground/[0.045] shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
        aria-hidden="true"
      >
        <span className="absolute inset-x-2 top-1 h-px bg-foreground/10" />
      </div>
    </div>
  );
}

export function BeyondCode() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("spotify");
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [shelfView, setShelfView] = useState<"read" | "reading">("read");
  const activeSong = favoriteSongs[activeSongIndex];
  const activeSongId = activeSong?.spotifyUrl
    .split("/track/")[1]
    ?.split("?")[0];

  return (
    <section className="pb-12 pt-9 sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-14">
      <div
        className="custom-scrollbar flex gap-2 overflow-x-auto pb-4"
        role="tablist"
        aria-label={t.beyondPage.tabLabel}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition-colors ${activeTab === tab ? "border-foreground/20 bg-foreground/[0.06] text-foreground" : "border-border text-muted hover:border-foreground/30 hover:text-foreground"}`}
          >
            {t.beyondPage.tabs[tab]}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[430px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "spotify" && (
              <div>
                <div className="max-w-2xl">
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-foreground sm:text-3xl">
                    {t.beyondPage.spotifyTitle}
                  </h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-muted">
                    {t.beyondPage.spotifyDescription}
                  </p>
                </div>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-foreground/[0.025]">
                    {activeSong?.cover && (
                      <motion.img
                        key={activeSong.cover}
                        src={activeSong.cover}
                        alt={`Capa de ${activeSong.title}, de ${activeSong.artist}`}
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.025 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>

                  <div>
                    <div className="space-y-2">
                      {favoriteSongs.length === 0 ? (
                        <EmptyState>{t.beyondPage.spotifyEmpty}</EmptyState>
                      ) : (
                        favoriteSongs.slice(0, 5).map((song, index) =>
                          activeSongIndex === index && activeSongId ? (
                            <motion.div
                              key={`${song.title}-${song.artist}`}
                              layout
                              initial={{ opacity: 0.7 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <iframe
                                className="w-full rounded-2xl border-0"
                                src={`https://open.spotify.com/embed/track/${activeSongId}?utm_source=generator&theme=0`}
                                width="100%"
                                height="152"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title={`${song.title} — ${song.artist}`}
                              />
                            </motion.div>
                          ) : (
                            <div
                              key={`${song.title}-${song.artist}`}
                              className="flex items-center rounded-2xl border border-border transition-colors hover:border-foreground/20 hover:bg-foreground/[0.025]"
                            >
                              <button
                                type="button"
                                onClick={() => setActiveSongIndex(index)}
                                className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left"
                                aria-label={`Tocar ${song.title}, de ${song.artist}`}
                              >
                                <span className="font-mono text-[9px] text-muted">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                {song.cover && (
                                  <img
                                    src={song.cover}
                                    alt=""
                                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="min-w-0">
                                  <strong className="block truncate text-xs font-medium text-foreground">
                                    {song.title}
                                  </strong>
                                  <span className="block truncate font-mono text-[10px] text-muted">
                                    {song.artist}
                                  </span>
                                </span>
                              </button>
                              <a
                                href={song.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-4 rounded-full p-2 text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                                aria-label={`Abrir ${song.title} no Spotify`}
                                title="Abrir no Spotify"
                              >
                                ↗
                              </a>
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shelf" && (
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
                  {t.beyondPage.shelfTitle}
                </h3>
                <p className="mt-3 font-mono text-xs leading-6 text-muted">
                  {t.beyondPage.shelfDescription}
                </p>
                <div
                  className="mt-7 flex flex-wrap gap-2"
                  role="group"
                  aria-label={t.beyondPage.shelfTitle}
                >
                  <button
                    type="button"
                    onClick={() => setShelfView("read")}
                    aria-pressed={shelfView === "read"}
                    className={`rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition-colors ${shelfView === "read" ? "border-foreground/20 bg-foreground/[0.06] text-foreground" : "border-border text-muted hover:border-foreground/30 hover:text-foreground"}`}
                  >
                    {t.beyondPage.read}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShelfView("reading")}
                    aria-pressed={shelfView === "reading"}
                    className={`rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition-colors ${shelfView === "reading" ? "border-foreground/20 bg-foreground/[0.06] text-foreground" : "border-border text-muted hover:border-foreground/30 hover:text-foreground"}`}
                  >
                    {t.beyondPage.readingList}
                  </button>
                </div>
                <motion.div
                  key={shelfView}
                  className="mt-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookGrid
                    items={shelfView === "read" ? booksRead : readingList}
                    empty={
                      shelfView === "read"
                        ? t.beyondPage.readEmpty
                        : t.beyondPage.readingEmpty
                    }
                    locale={locale}
                  />
                </motion.div>
              </div>
            )}

            {activeTab === "interests" && (
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
                  {t.beyondPage.interestsTitle}
                </h3>
                <p className="mt-3 font-mono text-xs leading-6 text-muted">
                  {t.beyondPage.interestsDescription}
                </p>
                <div className="mt-8 max-w-3xl">
                  {personalInterests.length === 0 ? (
                    <EmptyState>{t.beyondPage.interestsEmpty}</EmptyState>
                  ) : (
                    <ul className="space-y-5">
                      {personalInterests.map((interest) => (
                        <li
                          key={interest.label[locale]}
                          className="flex items-start gap-4"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35"
                            aria-hidden="true"
                          />
                          {interest.detail && (
                            <p className="font-mono text-xs leading-6 text-muted">
                              {interest.detail[locale]}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {activeTab === "current" && (
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
                  {t.beyondPage.currentTitle}
                </h3>
                <p className="mt-3 font-mono text-xs leading-6 text-muted">
                  {t.beyondPage.currentDescription}
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {currentMoments.length === 0 ? (
                    <div className="sm:col-span-2">
                      <EmptyState>{t.beyondPage.currentEmpty}</EmptyState>
                    </div>
                  ) : (
                    currentMoments.map((item) => (
                      <article
                        key={item.category[locale]}
                        className="rounded-2xl border border-border bg-foreground/[0.015] p-4"
                      >
                        <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                          {item.category[locale]}
                        </p>
                        <p className="mt-2 font-mono text-xs leading-5 text-foreground">
                          {item.value[locale]}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
