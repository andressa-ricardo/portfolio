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
    <div className="rounded-2xl border border-dashed border-border px-5 py-8 text-sm leading-6 text-muted">
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
          className={star <= rating ? "text-accent" : "text-border"}
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

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,190px))] gap-4">
      {items.map((book) => (
        <article
          key={`${book.title.pt}-${book.author}`}
          className="overflow-hidden rounded-3xl border border-border bg-foreground/[0.02]"
        >
          {book.cover && (
            <img
              src={book.cover}
              alt={`${locale === "pt" ? "Capa de" : "Cover of"} ${book.title[locale]}`}
              className="aspect-[2/3] w-full bg-foreground/[0.025] object-contain"
            />
          )}
          <div className="p-5">
            <h4 className="font-medium text-foreground">
              {book.title[locale]}
            </h4>
            <p className="mt-1 text-xs text-muted">{book.author}</p>
            {book.rating && (
              <div className="mt-4">
                <Stars rating={book.rating} />
              </div>
            )}
          </div>
        </article>
      ))}
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
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-medium transition-colors ${activeTab === tab ? "bg-accent text-white" : "border border-border text-muted hover:border-accent/40 hover:text-foreground"}`}
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
                  <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
                    {t.beyondPage.spotifyTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">
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
                              className={`flex items-center rounded-2xl border transition-colors ${activeSongIndex === index ? "border-accent/50 bg-accent/[0.06]" : "border-border hover:border-accent/40 hover:bg-accent/[0.035]"}`}
                            >
                              <button
                                type="button"
                                onClick={() => setActiveSongIndex(index)}
                                className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left"
                                aria-label={`Tocar ${song.title}, de ${song.artist}`}
                              >
                                <span className="font-mono text-[10px] text-accent">
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
                                  <strong className="block truncate text-sm font-medium text-foreground">
                                    {song.title}
                                  </strong>
                                  <span className="block truncate text-xs text-muted">
                                    {song.artist}
                                  </span>
                                </span>
                              </button>
                              <a
                                href={song.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-4 rounded-full p-2 text-accent transition-colors hover:bg-accent/10"
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
                <h3 className="text-3xl font-medium tracking-[-0.04em] text-foreground">
                  {t.beyondPage.shelfTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
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
                    className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${shelfView === "read" ? "bg-accent text-white" : "border border-border text-muted hover:border-accent/40 hover:text-foreground"}`}
                  >
                    {t.beyondPage.read}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShelfView("reading")}
                    aria-pressed={shelfView === "reading"}
                    className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${shelfView === "reading" ? "bg-accent text-white" : "border border-border text-muted hover:border-accent/40 hover:text-foreground"}`}
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
                <h3 className="text-3xl font-medium tracking-[-0.04em] text-foreground">
                  {t.beyondPage.interestsTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
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
                            className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {interest.detail && (
                            <p className="text-sm leading-7 text-muted sm:text-base">
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
                <h3 className="text-3xl font-medium tracking-[-0.04em] text-foreground">
                  {t.beyondPage.currentTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {t.beyondPage.currentDescription}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {currentMoments.length === 0 ? (
                    <div className="sm:col-span-2">
                      <EmptyState>{t.beyondPage.currentEmpty}</EmptyState>
                    </div>
                  ) : (
                    currentMoments.map((item) => (
                      <article
                        key={item.category[locale]}
                        className="rounded-2xl border border-border p-5"
                      >
                        <p className="text-[10px] uppercase tracking-[0.08em] text-accent">
                          {item.category[locale]}
                        </p>
                        <p className="mt-3 text-base font-medium text-foreground">
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
