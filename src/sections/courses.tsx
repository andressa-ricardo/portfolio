"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { CourseCategoryModal } from "@/components/course-category-modal";
import { SectionHeading } from "@/components/section-heading";
import {
  courses,
  type Course,
  type CourseCategory,
} from "@/data/resume";

interface CategorySummary {
  category: CourseCategory;
  items: Course[];
  totalHours: number;
}

function getCourseKey(course: Course) {
  return `${course.category}::${course.name.en}::${course.institution}::${course.issued.en}`;
}

const CATEGORY_ICONS: Record<CourseCategory, React.ReactNode> = {
  aws: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15c0-3.5 2.5-6 6-6 1 0 1.96.2 2.8.6A5 5 0 0 1 22 12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-1z" />
      <path d="M8 19c2 .9 6 1.3 9.5.2" />
    </svg>
  ),
  java: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 3h10v5a5 5 0 0 1-10 0z" />
      <path d="M17 5h1a2 2 0 0 1 0 4h-1" />
    </svg>
  ),
  n8n: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 12h8" />
      <path d="m14.5 7.5-6.5 4.5 6.5 4.5" />
    </svg>
  ),
  reactNative: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  advpl: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
      <path d="M8 17h8" />
    </svg>
  ),
};

const EMPTY_GROUPS: Record<CourseCategory, Course[]> = {
  aws: [],
  java: [],
  n8n: [],
  reactNative: [],
  advpl: [],
};

export function Courses() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<CourseCategory | null>(null);

  const categories = useMemo<CategorySummary[]>(() => {
    const grouped = courses.reduce<Record<CourseCategory, Course[]>>(
      (acc, course) => {
        const alreadyIncluded = acc[course.category].some(
          (item) => getCourseKey(item) === getCourseKey(course),
        );

        if (!alreadyIncluded) {
          acc[course.category].push(course);
        }

        return acc;
      },
      { ...EMPTY_GROUPS },
    );

    return (Object.entries(grouped) as [CourseCategory, Course[]][])
      .filter(([, items]) => items.length > 0)
      .map(([category, items]) => ({
        category,
        items,
        totalHours: items.reduce((sum, item) => sum + (item.hours ?? 0), 0),
      }));
  }, []);

  const selectedCategory = categories.find(
    ({ category }) => category === activeCategory,
  );

  return (
    <section id="courses" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.courses.title}</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map(({ category, items, totalHours }, i) => (
          <motion.button
            key={category}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => setActiveCategory(category)}
            className="group rounded-2xl border border-border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {CATEGORY_ICONS[category]}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t.courses.categories[category]}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {items.length} {items.length === 1 ? t.courses.courseLabel : t.courses.courseLabelPlural}
                    </p>
                  </div>

                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {totalHours > 0 ? `${totalHours}h` : t.courses.noHours}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {t.courses.descriptions[category]}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {t.courses.viewCertificates}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <CourseCategoryModal
        category={selectedCategory?.category ?? null}
        courses={selectedCategory?.items ?? []}
        onClose={() => setActiveCategory(null)}
      />
    </section>
  );
}