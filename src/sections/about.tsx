"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

export function About() {
  const { t } = useTranslation();

  const facts = [
    { label: t.about.facts.focus, value: "Frontend · Mobile · Full Stack" },
    { label: t.about.facts.education, value: "Unigranrio Afya · 2023–2025" },
    { label: t.about.facts.course, value: t.about.facts.courseValue },
  ];

  return (
    <section id="about" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:gap-14 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-[380px] justify-self-center"
        >
          <Image
            src="/image.png"
            alt={t.about.photoAlt}
            width={640}
            height={640}
            sizes="(max-width: 1024px) 80vw, 380px"
            className="h-auto w-full rounded-2xl border border-border object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex flex-col justify-center"
        >
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
            {t.about.location}
          </p>
          <div className="space-y-4 font-mono text-xs leading-6 text-muted">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <dl className="mt-7 border-t border-border">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-2 border-b border-border py-4 sm:grid-cols-[130px_1fr] sm:items-center"
              >
                <dt className="font-mono text-[11px] text-muted">
                  {fact.label}
                </dt>
                <dd className="font-mono text-xs font-medium text-foreground sm:text-right">
                  {fact.value}
                </dd>
              </div>
            ))}
            <div className="grid gap-2 border-b border-border py-4 sm:grid-cols-[130px_1fr] sm:items-center">
              <dt className="font-mono text-[11px] text-muted">
                {t.about.facts.building}
              </dt>
              <dd className="sm:text-right">
                <a
                  href="https://www.maoslivres.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-b border-border pb-0.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Mãos Livres <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
