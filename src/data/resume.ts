export interface Education {
  institution: string;
  degree: { pt: string; en: string };
  field: { pt: string; en: string };
  period: { start: string; end: string | null };
  description?: { pt: string; en: string };
}

export const education: Education[] = [
  {
    institution: "Unigranrio Afya",
    degree: {
      pt: "Tecnólogo",
      en: "Associate Degree",
    },
    field: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    period: { start: "2023-08", end: "2025-12" },
    description: {
      pt: "Formação focada em desenvolvimento de software, arquitetura de sistemas, banco de dados e práticas modernas de engenharia de software.",
      en: "Program focused on software development, systems architecture, databases, and modern software engineering practices.",
    },
  },
  {
    institution: "Aulas Particulares de Inglês",
    degree: {
      pt: "Formação em Idioma",
      en: "Language Studies",
    },
    field: {
      pt: "Inglês (Nível B1)",
      en: "English (B1 Level)",
    },
    period: { start: "2024-07", end: null },
    description: {
      pt: "Aulas particulares com foco no desenvolvimento da fluência, comunicação profissional e compreensão em contextos técnicos e cotidianos.",
      en: "Private lessons focused on fluency development, professional communication, and comprehension in both technical and everyday contexts.",
    },
  },
];

export type CourseCategory =
  | "aws"
  | "java"
  | "n8n"
  | "reactNative"
  | "advpl";

export interface Course {
  name: { pt: string; en: string };
  category: CourseCategory;
  institution: string;
  issued: { pt: string; en: string };
  hours?: number;
  credential?: string;
  link?: string;
}

export const LINKEDIN_CERTIFICATIONS_URL =
  "https://www.linkedin.com/in/andressa-ricardo/details/certifications/";

export const courses: Course[] = [
  {
    name: {
      pt: "AWS S3 - Manipulação e Armazenamento de Objetos na Nuvem",
      en: "AWS S3 - Object Storage and Management in the Cloud",
    },
    category: "aws",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 10,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "AWS EC2 - Alta Disponibilidade e Escalabilidade",
      en: "AWS EC2 - High Availability and Scalability",
    },
    category: "aws",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 10,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "Java e Spring Security - Protegendo Aplicações Web",
      en: "Java and Spring Security - Securing Web Applications",
    },
    category: "java",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 12,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "Java - Lambdas, Streams e Spring Framework",
      en: "Java - Lambdas, Streams and Spring Framework",
    },
    category: "java",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 12,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "Java - Aplicando Orientação a Objetos",
      en: "Java - Applying Object-Oriented Programming",
    },
    category: "java",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 10,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "n8n para devs - Construindo workflows inteligentes",
      en: "n8n for Devs - Building Intelligent Workflows",
    },
    category: "n8n",
    institution: "Alura",
    issued: { pt: "2024", en: "2024" },
    hours: 2,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "React Native: desenvolvendo com Expo",
      en: "React Native: developing with Expo",
    },
    category: "reactNative",
    institution: "Alura",
    issued: { pt: "set de 2025", en: "Sep 2025" },
    hours: 8,
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
  {
    name: {
      pt: "ADVPL Course",
      en: "ADVPL Course",
    },
    category: "advpl",
    institution: "LF Soluções",
    issued: { pt: "ago de 2025", en: "Aug 2025" },
    link: LINKEDIN_CERTIFICATIONS_URL,
  },
];

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  level: SkillLevel;
  category: "frontend" | "backend" | "cloud" | "tools" | "database";
}

export const skills: Skill[] = [
  { name: "React", level: 4, category: "frontend" },
  { name: "React Native", level: 3, category: "frontend" },
  { name: "Expo", level: 3, category: "frontend" },
  { name: "Next.js", level: 3, category: "frontend" },
  { name: "TypeScript", level: 5, category: "frontend" },
  { name: "Vue.js", level: 3, category: "frontend" },
  { name: "JavaScript", level: 5, category: "frontend" },
  { name: "HTML & CSS", level: 5, category: "frontend" },
  { name: "Tailwind CSS", level: 4, category: "frontend" },
  { name: "Node.js", level: 5, category: "backend" },
  { name: "REST APIs", level: 4, category: "backend" },
  { name: "Convex", level: 3, category: "backend" },
  { name: "Supabase", level: 3, category: "backend" },
  { name: "Java", level: 2, category: "backend" },
  { name: "AWS", level: 3, category: "cloud" },
  { name: "Amazon EC2", level: 3, category: "cloud" },
  { name: "Amazon S3", level: 3, category: "cloud" },
  { name: "Cloudflare R2", level: 3, category: "cloud" },
  { name: "Vercel", level: 4, category: "cloud" },
  { name: "n8n", level: 3, category: "cloud" },
  { name: "CI/CD", level: 3, category: "cloud" },
  { name: "Git & GitHub", level: 5, category: "tools" },
  { name: "VS Code", level: 5, category: "tools" },
  { name: "IntelliJ", level: 2, category: "tools" },
  { name: "PostgreSQL", level: 2, category: "database" },
  { name: "MySQL", level: 4, category: "database" },
  { name: "Prisma", level: 3, category: "database" },
  { name: "Sequelize", level: 3, category: "database" },
];

export const skillCategories = [
  "frontend",
  "backend",
  "cloud",
  "tools",
  "database",
] as const;

export interface Language {
  name: { pt: string; en: string };
  level: "native" | "fluent" | "intermediate" | "basic";
  flag: string;
}

export const languages: Language[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: "native", flag: "🇧🇷" },
  { name: { pt: "Inglês", en: "English" }, level: "intermediate", flag: "🇺🇸" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "basic", flag: "🇪🇸" },
];

export interface Social {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/andressa-ricardo",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/andressa-ricardo",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:andressaricardo.developer@gmail.com",
    icon: "email",
  },
];