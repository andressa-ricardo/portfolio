"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiCloudflare,
  SiConvex,
  SiExpo,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSequelize,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa6";
import { VscCode, VscVscode } from "react-icons/vsc";
import { useTranslation } from "@/components/language-provider";
import { skills, type Skill, type SkillLevel } from "@/data/resume";

type TechCategory =
  | "all"
  | "frontend"
  | "mobile"
  | "backend"
  | "database"
  | "infrastructure";

const FILTERS: TechCategory[] = [
  "all",
  "frontend",
  "mobile",
  "backend",
  "database",
  "infrastructure",
];

const MOBILE_SKILLS = new Set(["React Native", "Expo"]);
const DATABASE_SKILLS = new Set([
  "PostgreSQL",
  "MySQL",
  "Prisma",
  "Sequelize",
  "Supabase",
]);

const SKILL_ICONS: Record<string, IconType> = {
  React: SiReact,
  "React Native": SiReact,
  Expo: SiExpo,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Vue.js": SiVuedotjs,
  JavaScript: SiJavascript,
  "HTML & CSS": SiHtml5,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "REST APIs": SiOpenapiinitiative,
  Convex: SiConvex,
  Supabase: SiSupabase,
  Java: FaJava,
  AWS: FaAws,
  "Amazon EC2": FaAws,
  "Amazon S3": FaAws,
  "Cloudflare R2": SiCloudflare,
  Vercel: SiVercel,
  n8n: SiN8N,
  "CI/CD": SiGithubactions,
  "Git & GitHub": SiGit,
  "VS Code": VscVscode,
  IntelliJ: SiIntellijidea,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Prisma: SiPrisma,
  Sequelize: SiSequelize,
};

const COPY = {
  pt: {
    title: "Ferramentas que fazem parte do meu universo.",
    intro: "Tecnologias que uso para transformar ideias em produtos digitais.",
    filterLabel: "Filtrar tecnologias",
    filters: {
      all: "Todas",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Databases",
      infrastructure: "Ferramentas & infraestrutura",
    },
    details: {
      frontend:
        "Construção de interfaces modernas, responsivas e acessíveis para a web.",
      mobile:
        "Desenvolvimento de experiências mobile fluidas, performáticas e consistentes.",
      backend:
        "Serviços, integrações e regras de negócio que sustentam produtos digitais.",
      database:
        "Modelagem, consulta e gerenciamento dos dados que movem as aplicações.",
      infrastructure:
        "Ferramentas, cloud e fluxos que apoiam desenvolvimento, entrega e operação.",
    },
    levels: [
      "",
      "Explorando",
      "Em evolução",
      "Uso recorrente",
      "Experiência sólida",
      "Domínio avançado",
    ],
    footer: "Sempre aprendendo. Sempre construindo.",
  },
  en: {
    title: "The tools in my universe.",
    intro: "Technologies I use to turn ideas into digital products.",
    filterLabel: "Filter technologies",
    filters: {
      all: "All",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Databases",
      infrastructure: "Tools & infrastructure",
    },
    details: {
      frontend:
        "Building modern, responsive, and accessible interfaces for the web.",
      mobile:
        "Developing fluid, performant, and consistent mobile experiences.",
      backend:
        "Services, integrations, and business logic that support digital products.",
      database:
        "Modeling, querying, and managing the data that powers applications.",
      infrastructure:
        "Tools, cloud services, and workflows that support development and delivery.",
    },
    levels: [
      "",
      "Exploring",
      "Developing",
      "Regular use",
      "Solid experience",
      "Advanced proficiency",
    ],
    footer: "Always learning. Always building.",
  },
} as const;

function getCategory(skill: Skill): Exclude<TechCategory, "all"> {
  if (MOBILE_SKILLS.has(skill.name)) return "mobile";
  if (DATABASE_SKILLS.has(skill.name)) return "database";
  if (skill.category === "frontend") return "frontend";
  if (skill.category === "backend") return "backend";
  return "infrastructure";
}

function LevelIndicator({ level }: { level: SkillLevel }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-5 rounded-full ${index < level ? "bg-foreground/55" : "bg-border"}`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const { locale } = useTranslation();
  const copy = COPY[locale];
  const [filter, setFilter] = useState<TechCategory>("all");
  const [selectedName, setSelectedName] = useState(skills[0]?.name ?? "");

  const filteredSkills =
    filter === "all"
      ? skills
      : skills.filter((skill) => getCategory(skill) === filter);
  const selected =
    skills.find((skill) => skill.name === selectedName) ?? filteredSkills[0];
  const selectedCategory = selected ? getCategory(selected) : "frontend";
  const SelectedIcon = selected
    ? (SKILL_ICONS[selected.name] ?? VscCode)
    : VscCode;

  const selectFilter = (nextFilter: TechCategory) => {
    setFilter(nextFilter);
    const first =
      nextFilter === "all"
        ? skills[0]
        : skills.find((skill) => getCategory(skill) === nextFilter);
    if (first) setSelectedName(first.name);
  };

  return (
    <section id="skills" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="max-w-3xl">
        <p className="font-mono text-xs leading-6 text-muted">{copy.intro}</p>
      </div>

      <div
        className="custom-scrollbar mt-6 flex gap-1 overflow-x-auto border-b border-border pb-4"
        role="tablist"
        aria-label={copy.filterLabel}
      >
        {FILTERS.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            onClick={() => selectFilter(category)}
            className={`shrink-0 rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.04em] transition-colors ${
              filter === category
                ? "border-foreground/20 bg-foreground/[0.06] text-foreground"
                : "border-transparent text-muted hover:border-border hover:text-foreground"
            }`}
          >
            {copy.filters[category]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(250px,0.75fr)] lg:gap-12">
        <motion.div
          layout
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const active = selected?.name === skill.name;
              const SkillIcon = SKILL_ICONS[skill.name] ?? VscCode;
              return (
                <motion.button
                  layout
                  key={skill.name}
                  type="button"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(index * 0.015, 0.18),
                  }}
                  onClick={() => setSelectedName(skill.name)}
                  aria-pressed={active}
                  className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-full border p-2 font-mono text-[9px] leading-4 transition-colors sm:text-[10px] ${
                    active
                      ? "border-accent/55 bg-accent/[0.07] text-foreground"
                      : "border-border text-muted hover:border-foreground/30 hover:bg-foreground/[0.025] hover:text-foreground"
                  }`}
                >
                  <SkillIcon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <span>{skill.name}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="lg:sticky lg:top-8 lg:self-start lg:border-l lg:border-border lg:pl-10">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  {copy.filters[selectedCategory]}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <SelectedIcon
                    className="h-6 w-6 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <h3 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
                    {selected.name}
                    <span className="text-accent">.</span>
                  </h3>
                </div>
                <p className="mt-4 font-mono text-xs leading-6 text-muted">
                  {copy.details[selectedCategory]}
                </p>
                <div className="mt-6">
                  <LevelIndicator level={selected.level} />
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                    {copy.levels[selected.level]}
                  </p>
                </div>
                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  {copy.footer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
