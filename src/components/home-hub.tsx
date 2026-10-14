"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

const ITEMS = [
  {
    href: "/sobre",
    key: "about",
    position: "lg:col-start-1 lg:row-start-1 lg:self-start",
  },
  {
    href: "/trajetoria",
    key: "journey",
    position: "lg:col-start-3 lg:row-start-1 lg:self-start",
  },
  {
    href: "/projetos",
    key: "projects",
    position: "lg:col-start-1 lg:row-start-2 lg:self-center",
  },
  {
    href: "/universo-tech",
    key: "tech",
    position: "lg:col-start-3 lg:row-start-2 lg:self-center",
  },
  {
    href: "/alem-do-codigo",
    key: "beyond",
    position: "lg:col-start-1 lg:row-start-3 lg:self-end",
  },
  {
    href: "/contato",
    key: "contact",
    position: "lg:col-start-3 lg:row-start-3 lg:self-end",
  },
] as const;

const CODE_FRAGMENTS = [
  {
    code: "const ideas = await create();",
    top: "17%",
    left: "17%",
    duration: 21,
    delay: 0,
  },
  {
    code: "<Experience meaningful />",
    top: "24%",
    left: "59%",
    duration: 19,
    delay: 1.8,
  },
  {
    code: "type Curiosity = 'infinite';",
    top: "39%",
    left: "8%",
    duration: 23,
    delay: 0.7,
  },
  {
    code: "function buildFuture() {",
    top: "43%",
    left: "69%",
    duration: 18,
    delay: 2.4,
  },
  {
    code: "return code + creativity;",
    top: "58%",
    left: "14%",
    duration: 22,
    delay: 1.1,
  },
  {
    code: "interface HumanExperience",
    top: "64%",
    left: "64%",
    duration: 20,
    delay: 3.1,
  },
  {
    code: "const [ideas, setIdeas] = useState([]);",
    top: "31%",
    left: "36%",
    duration: 24,
    delay: 2,
  },
  {
    code: "return <Future />;",
    top: "76%",
    left: "53%",
    duration: 17,
    delay: 0.4,
  },
  {
    code: "while (learning) evolve();",
    top: "83%",
    left: "26%",
    duration: 22,
    delay: 2.8,
  },
] as const;

function FloatingCode() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-[5%] top-0 z-0 h-[360px] select-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)] lg:inset-y-[4%] lg:h-auto"
      aria-hidden="true"
    >
      {CODE_FRAGMENTS.map((fragment, index) => (
        <motion.span
          key={fragment.code}
          className={`absolute whitespace-nowrap font-mono tracking-[-0.02em] text-foreground/[0.16] blur-[1px] dark:text-foreground/[0.18] ${
            index >= 7
              ? "hidden text-[9px] lg:block"
              : index >= 5
                ? index === 6
                  ? "hidden text-[10px] sm:block sm:text-[11px]"
                  : "hidden text-[9px] sm:block"
                : index === 1
                  ? "text-[10px] sm:text-[11px]"
                  : "text-[9px] sm:text-[10px]"
          }`}
          style={{ top: fragment.top, left: fragment.left }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.9 }
              : {
                  x: [0, index % 2 === 0 ? 10 : -9, 0],
                  y: [0, -9, 4, 0],
                  opacity: [0.82, 1, 0.86, 0.82],
                }
          }
          transition={{
            duration: fragment.duration,
            delay: fragment.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {fragment.code}
        </motion.span>
      ))}
    </div>
  );
}

export function HomeHub() {
  const { t } = useTranslation();

  return (
    <main className="home-grid relative mx-auto w-full max-w-[1728px] overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-9">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vw] max-h-[620px] w-[55vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.018] blur-3xl"
        aria-hidden="true"
      />

      <FloatingCode />

      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-[minmax(180px,1fr)_minmax(360px,1.5fr)_minmax(180px,1fr)] lg:grid-rows-3 lg:gap-x-7 lg:gap-y-4 lg:py-12 xl:grid-cols-[minmax(220px,1fr)_minmax(420px,1.5fr)_minmax(220px,1fr)] xl:gap-x-9">
        <div className="order-first col-span-full flex flex-col items-center justify-center py-7 text-center lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.08em] text-muted"
          ></motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-[clamp(3rem,6vw,5.75rem)] font-light leading-[0.88] tracking-[-0.065em] text-foreground"
          >
            Andressa
            <br />
            Ricardo<span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-6 max-w-md font-mono text-[11px] leading-6 text-muted sm:text-xs"
          >
            {t.home.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
          >
            <span>Frontend</span>
            <span className="text-foreground/30">•</span>
            <span>Mobile</span>
            <span className="text-foreground/30">•</span>
            <span>Full stack</span>
          </motion.div>
        </div>

        {ITEMS.map(({ href, key, position }, index) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + index * 0.06 }}
            className={`${position} lg:w-full`}
          >
            <Link
              href={href}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/[0.025] lg:min-h-0 lg:border-transparent lg:p-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-foreground/30 group-hover:bg-foreground/[0.05]">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/35 transition-colors group-hover:bg-foreground/70" />
              </span>
              <span className="min-w-0">
                <span className="mb-1 flex items-center gap-2 font-mono text-[8px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                  <span className="h-px w-3 bg-border transition-all group-hover:w-7 group-hover:bg-foreground/30" />
                </span>
                <span className="block text-base font-medium tracking-[-0.025em] text-foreground sm:text-lg">
                  {t.home.items[key]}
                </span>
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="ml-auto shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:text-foreground group-hover:opacity-100"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
