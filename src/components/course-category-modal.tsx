"use client";

import { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { type Course, type CourseCategory } from "@/data/resume";

interface Props {
  category: CourseCategory | null;
  courses: Course[];
  onClose: () => void;
}

function getCourseKey(course: Course) {
  return `${course.category}::${course.name.en}::${course.institution}::${course.issued.en}`;
}

export function CourseCategoryModal({ category, courses, onClose }: Props) {
  const { t, locale } = useTranslation();

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!category) return;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [category, handleKey]);

  const uniqueCourses = useMemo(() => {
    const seen = new Set<string>();

    return courses.filter((course) => {
      const key = getCourseKey(course);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [courses]);

  const rawMaxHours = uniqueCourses.reduce(
    (max, course) => Math.max(max, course.hours ?? 0),
    0,
  );
  const maxHours = rawMaxHours > 0 ? rawMaxHours : 1;

  return (
    <AnimatePresence>
      {category ? (
        <motion.div
          key="course-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto my-4 flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-border bg-background p-5 shadow-2xl sm:my-8 sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-accent">LinkedIn</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {t.courses.categories[category]}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {t.courses.modalSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent/10"
                aria-label={t.courses.closeModal}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto pr-1">
              <div className="grid gap-3 sm:grid-cols-2">
                {uniqueCourses.map((course, index) => {
                  const width = course.hours
                    ? `${(course.hours / maxHours) * 100}%`
                    : "100%";

                  return (
                    <motion.a
                      key={getCourseKey(course)}
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="group rounded-2xl border border-border/80 bg-foreground/2 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 dark:bg-white/2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                            {course.name[locale]}
                          </h4>
                          <p className="mt-1 text-sm text-accent">{course.institution}</p>
                        </div>

                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent">
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span>{course.issued[locale]}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>{course.hours ? `${course.hours}h` : t.courses.noHours}</span>
                      </div>

                      {course.hours ? (
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                          <motion.div
                            className="h-full rounded-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width }}
                            transition={{ duration: 0.45, delay: 0.1 + index * 0.05 }}
                          />
                        </div>
                      ) : (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {t.courses.noHours}
                        </div>
                      )}

                      <p className="mt-3 text-sm font-medium text-accent">
                        {t.courses.openOnLinkedIn}
                      </p>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}