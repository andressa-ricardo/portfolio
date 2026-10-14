"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiCloudflare,
  SiBootstrap,
  SiConvex,
  SiExpo,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGrafana,
  SiHtml5,
  SiIntellijidea,
  SiJira,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPm2,
  SiPostman,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSass,
  SiSequelize,
  SiSpring,
  SiStripe,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws, FaCreditCard, FaJava } from "react-icons/fa6";
import { VscCode, VscTools, VscVscode } from "react-icons/vsc";
import { useTranslation } from "@/components/language-provider";
import { skills, type Skill } from "@/data/resume";

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

const MOBILE_SKILLS = new Set(["React Native", "Expo", "Swift"]);
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
  Bootstrap: SiBootstrap,
  "Tailwind CSS": SiTailwindcss,
  Sass: SiSass,
  Swift: SiSwift,
  "Node.js": SiNodedotjs,
  Spring: SiSpring,
  "REST APIs": SiOpenapiinitiative,
  Convex: SiConvex,
  Supabase: SiSupabase,
  Java: FaJava,
  Stripe: SiStripe,
  Asaas: FaCreditCard,
  "Guru Pagamentos": FaCreditCard,
  AWS: FaAws,
  "Amazon EC2": FaAws,
  "Amazon S3": FaAws,
  "Cloudflare R2": SiCloudflare,
  Vercel: SiVercel,
  n8n: SiN8N,
  "CI/CD": SiGithubactions,
  PM2: SiPm2,
  Linux: SiLinux,
  Grafana: SiGrafana,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Jira: SiJira,
  Integrator: VscTools,
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

export function Skills() {
  const { locale } = useTranslation();
  const copy = COPY[locale];
  const [filter, setFilter] = useState<TechCategory>("all");

  const filteredSkills =
    filter === "all"
      ? skills
      : skills.filter((skill) => getCategory(skill) === filter);

  const selectFilter = (nextFilter: TechCategory) => {
    setFilter(nextFilter);
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

      <motion.div
        layout
        className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const SkillIcon = SKILL_ICONS[skill.name] ?? VscCode;
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(index * 0.015, 0.18),
                }}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-full border border-border p-2 font-mono text-[9px] leading-4 text-muted transition-colors hover:border-foreground/30 hover:bg-foreground/[0.025] hover:text-foreground sm:text-[10px]"
              >
                <SkillIcon
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
                <span>{skill.name}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
