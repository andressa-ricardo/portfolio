const fallbackSiteUrl = "https://andressaricardo-dev.vercel.app/";

export const siteConfig = {
  name: "Andressa Ricardo",
  shortName: "Andressa Ricardo",
  title: "Andressa Ricardo | Desenvolvedora Full Stack, Frontend e Mobile",
  description:
    "Portfólio de Andressa Ricardo, desenvolvedora full stack com foco em React, Next.js, TypeScript, Node.js e React Native. Desenvolvimento de websites, landing pages, sistemas web e aplicativos mobile.",
  keywords: [
    "andressa ricardo",
    "desenvolvedora full stack",
    "desenvolvedora frontend",
    "desenvolvedora mobile",
    "react",
    "next.js",
    "typescript",
    "node.js",
    "react native",
    "portfolio desenvolvedora",
    "desenvolvimento de sites",
    "landing pages",
    "aplicativos mobile",
    "rio de janeiro",
  ],
  locale: "pt-BR",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
  image: "/andressa_picture.jpeg",
  email: "andressaricardo.developer@gmail.com",
  linkedIn: "https://linkedin.com/in/andressa-ricardo",
  github: "https://github.com/andressa-ricardo",
  location: "Rio de Janeiro, Brasil",
  profession: "Desenvolvedora Full Stack",
} as const;

export function getBaseUrl() {
  return new URL(siteConfig.siteUrl);
}

