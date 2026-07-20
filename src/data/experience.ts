export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export type ExperienceType = "personal" | "fulltime" | "freelance";

export const TYPE_BADGE: Record<ExperienceType, string> = {
  personal:
    "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400",
  fulltime:
    "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  freelance:
    "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
};

export interface ExperienceEntry {
  id: string;
  type: ExperienceType;
  company: string;
  role: { pt: string; en: string };
  period: { start: string; end: string | null };
  shortDescription: { pt: string; en: string };
  overview?: { pt: string; en: string };
  fullDescription: { pt: string; en: string };
  technologies: string[];
  media: MediaItem[];
  link?: string;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "maos-livres",
    type: "personal",
    company: "Mãos Livres",
    role: {
      pt: "Co-Founder",
      en: "Co-Founder",
    },
    period: { start: "2026-03", end: null },
    shortDescription: {
      pt: "Software house especializada em desenvolvimento de sistemas, automações e integrações para empresas.",
      en: "Software house focused on custom software development, automation, and system integrations.",
    },
    overview: {
      pt: `A Mãos Livres é uma software house especializada no desenvolvimento de sistemas sob medida, automações de processos e integrações entre plataformas. Nosso objetivo é transformar processos manuais em soluções digitais escaláveis que aumentam a produtividade das empresas.`,
      en: `Mãos Livres is a software house specialized in custom software development, business process automation, and platform integrations. Our goal is to transform manual workflows into scalable digital solutions that improve business productivity.`,
    },
    fullDescription: {
      pt: `Como cofundadora e desenvolvedora, participo tanto da estratégia da empresa quanto da execução técnica dos projetos.

Minhas responsabilidades incluem:

- Desenvolvimento de aplicações Web e Mobile
- Arquitetura Front-end
- Desenvolvimento de APIs
- Automações de processos
- Integrações entre plataformas
- Levantamento de requisitos junto aos clientes
- Planejamento técnico de novos produtos
- Evolução contínua dos produtos da empresa`,
      en: `As Co-Founder and Software Developer, I am involved in both the company's strategy and technical execution.

My responsibilities include:

- Web and Mobile application development
- Frontend architecture
- API development
- Business process automation
- Platform integrations
- Requirements gathering
- Technical planning
- Continuous product development`,
    },
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Python",
      "Docker",
      "PostgreSQL",
      "AWS",
    ],
    media: [],
    link: "https://www.maoslivres.com/",
  },
  {
    id: "agendamento-livre",
    type: "personal",
    company: "Agendamento Livre",
    role: {
      pt: "Lead Frontend Developer",
      en: "Lead Frontend Developer",
    },
    period: { start: "2026-07", end: null },
    shortDescription: {
      pt: "Plataforma SaaS para gestão de agendamentos, clientes e serviços para empresas prestadoras de serviços.",
      en: "SaaS platform for appointment scheduling, customer management, and service businesses.",
    },
    overview: {
      pt: `O Agendamento Livre é um produto da Mãos Livres criado para digitalizar a gestão de empresas prestadoras de serviços, oferecendo agendamento online, gestão de clientes, profissionais, serviços e indicadores do negócio em uma única plataforma.`,
      en: `Agendamento Livre is a Mãos Livres product built to digitalize service businesses by providing online scheduling, customer management, staff management, and business insights in a single platform.`,
    },
    fullDescription: {
      pt: `Sou responsável pelo desenvolvimento Front-end do produto desde sua concepção, participando da definição das funcionalidades, arquitetura da aplicação e implementação das interfaces.

Entre as funcionalidades desenvolvidas estão:

- Sistema completo de agendamento online
- Gestão de profissionais e serviços
- Cadastro de empresas e onboarding
- Gestão de clientes
- Landing page institucional
- Área administrativa
- Componentes reutilizáveis
- Internacionalização (i18n)
- Interface responsiva
- Integrações com notificações e automações`,
      en: `I lead the Frontend development of the product from its initial conception, participating in feature definition, application architecture, and interface implementation.

Main features include:

- Complete online appointment scheduling
- Staff and service management
- Company onboarding
- Customer management
- Marketing landing page
- Administrative dashboard
- Reusable component library
- Internationalization (i18n)
- Responsive interfaces
- Notification and automation integrations`,
    },
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "i18n",
    ],
    media: [],
  },
  {
    id: "ondish-foods",
    type: "fulltime",
    company: "Ondish Foods",
    role: {
      pt: "Frontend Developer",
      en: "Frontend Developer",
    },
    period: { start: "2025-11", end: null },
    shortDescription: {
      pt: "Desenvolvimento completo das aplicações Web e Mobile da plataforma de menu digital, reservas, pedidos e pagamentos para restaurantes.",
      en: "Full frontend development of the platform's Web and Mobile applications for digital menus, reservations, ordering, and payments.",
    },
    overview: {
      pt: `A Ondish Foods é uma plataforma que conecta restaurantes e clientes em Portugal, reunindo reservas de mesas, menu digital com QR Code, pedidos pelo celular e pagamentos online em um único ecossistema.

A plataforma atende tanto clientes que desejam encontrar restaurantes, reservar mesas e realizar pedidos de forma prática quanto estabelecimentos que buscam digitalizar toda a operação, desde o gerenciamento do cardápio até o acompanhamento de pedidos em tempo real, através de aplicações Web e Mobile.`,
      en: `Ondish Foods is a platform that connects restaurants and customers in Portugal, combining table reservations, QR code digital menus, mobile ordering, and online payments into a single ecosystem.

The platform serves both customers looking for a seamless dining experience and restaurants seeking to fully digitalize their operations through Web and Mobile applications.`,
    },
    fullDescription: {
      pt: `Sou responsável pelo desenvolvimento de toda a camada de Front-end da plataforma, atuando nas aplicações Web e Mobile.

No ambiente web, desenvolvo e evoluo o Painel Administrativo, o Portal do Parceiro e o website institucional da empresa.

Entre as principais funcionalidades desenvolvidas estão:

- Gestão de restaurantes
- Cadastro e gerenciamento de mesas
- Gestão de cardápio, categorias e produtos
- Cadastro de funcionários
- Gerenciamento de pedidos em tempo real
- Relatórios administrativos
- Landing page institucional

Também fui responsável pelo desenvolvimento completo do aplicativo mobile utilizando React Native e Expo, estruturando toda a arquitetura da aplicação, navegação, componentização, gerenciamento de estados locais e preparação para integração com o backend.

Além disso, participo continuamente da implementação de novas funcionalidades, criação de componentes reutilizáveis, otimizações de performance, internacionalização (i18n), correções e melhorias de experiência do usuário em todas as aplicações da plataforma.`,
      en: `I am responsible for the entire Frontend layer of the platform, working across both Web and Mobile applications.

On the web platform, I develop and maintain the Admin Dashboard, Partner Portal, and the company's institutional website.

Main features include:

- Restaurant management
- Table management
- Menu, categories and products management
- Employee management
- Real-time order management
- Administrative reports
- Marketing landing page

I also developed the complete mobile application using React Native and Expo, designing the application architecture, navigation, reusable components, local state management, and preparing the app for backend integration.

Additionally, I continuously work on new features, reusable components, performance improvements, internationalization (i18n), bug fixes, and overall user experience improvements across the platform.`,
    },
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind CSS",
      "i18n",
      "Responsive Design",
    ],
    media: [],
    link: "https://ondishfoods.pt/",
  },
  {
    id: "prodia",
    type: "personal",
    company: "Prodia",
    role: {
      pt: "Full Stack Developer (Projeto Pessoal)",
      en: "Full Stack Developer (Personal Project)",
    },
    period: { start: "2026-05", end: null },
    shortDescription: {
      pt: "Plataforma em desenvolvimento para geração de imagens e vídeos de produtos com IA, com automação de catálogo e sistema de créditos.",
      en: "In-progress AI platform for generating product images and videos, with catalog automation and credit-based system.",
    },
    fullDescription: {
      pt: `Estou desenvolvendo o Prodia como um projeto pessoal focado na criação de conteúdo visual para produtos utilizando inteligência artificial.

A plataforma permite transformar fotos simples em imagens profissionais e vídeos prontos para e-commerce e marketing.

Principais pontos do projeto:

- Geração de imagens e vídeos com IA
- Sistema de créditos e planos com Stripe
- Módulo de catálogo com edição visual de produtos
- Suporte a contas multiusuário (enterprise)
- Arquitetura escalável com separação de frontend, backend e serviços de IA

O projeto demonstra minha capacidade de estruturar e desenvolver um produto completo, incluindo lógica de negócio, monetização e experiência do usuário.`,

      en: `I am developing Prodia as a personal project focused on AI-powered visual content generation for products.

The platform allows users to transform simple product photos into professional images and videos for e-commerce and marketing.

Key aspects of the project:

- AI-powered image and video generation
- Credit-based system and subscription plans with Stripe
- Catalog module with visual product editing
- Multi-user (enterprise) support
- Scalable architecture with separated frontend, backend, and AI services

This project demonstrates my ability to design and build a complete product, including business logic, monetization, and user experience.`,
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Fal.ai",
      "AI Integrations",
    ],
    media: [
      {
        type: "video",
        src: "/media/projects/prodia_v1.mp4",
        alt: "Prodia video 1",
      },
      {
        type: "video",
        src: "/media/projects/prodia_v2.mp4",
        alt: "Prodia video 2",
      },
      {
        type: "video",
        src: "/media/projects/prodia_v3.mp4",
        alt: "Prodia video 3",
      },
      {
        type: "video",
        src: "/media/projects/prodia_v4.mp4",
        alt: "Prodia video 4",
      },
    ],
  },

  {
    id: "criarch",
    type: "freelance",
    company: "Criarch",
    role: {
      pt: "Full Stack Developer",
      en: "Full Stack Developer",
    },
    period: { start: "2026-04", end: "2026-07" },
    shortDescription: {
      pt: "Plataforma de IA para arquitetos que transforma fotos de projetos em renders realistas e vídeos cinematográficos, com sistema de créditos e pipelines assíncronos.",
      en: "AI platform for architects that turns project photos into realistic renders and cinematic videos, with credit-based billing and asynchronous pipelines.",
    },
    overview: {
      pt: `O CriArch é uma plataforma de inteligência artificial para arquitetos que transforma fotos reais de projetos — obras em andamento, maquetes físicas ou renders básicos — em renders profissionais e vídeos cinematográficos em minutos, sem necessidade de software de modelagem.

A plataforma cobre todo o fluxo criativo de um escritório de arquitetura: renders realistas com modelos de difusão (com presets de iluminação e diferentes proporções), vídeos com movimentos de câmera profissionais (push in, travelling, drone shot, orbit) e um Studio com ferramentas de edição rápida como sky replacement, decoração de ambientes e upscale de imagens.`,
      en: `CriArch is an AI platform for architects that turns real project photos — work in progress, physical models, or basic renders — into professional renders and cinematic videos in minutes, with no modeling software required.

The platform covers the entire creative workflow of an architecture studio: realistic renders powered by diffusion models (with lighting presets and multiple aspect ratios), videos with professional camera movements (push in, travelling, drone shot, orbit), and a Studio with quick editing tools such as sky replacement, room decoration, and image upscaling.`,
    },
    fullDescription: {
      pt: `Atuo no desenvolvimento full stack da plataforma, sendo responsável pela arquitetura e implementação de funcionalidades voltadas à geração de conteúdo com IA.

Desenvolvi fluxos completos para criação de imagens, vídeos e composições finais, utilizando pipelines assíncronos com processamento em etapas (render, vídeo e concatenação).

A plataforma inclui:

- Sistema de créditos e billing por uso
- Integração com provedores de IA (imagem e vídeo) via fal.ai
- Processamento assíncrono com filas e eventos
- Armazenamento e gerenciamento de mídia
- Painel administrativo com controle de features, planos e prompts de IA

Utilizo Convex no backend para gerenciamento de dados, autenticação e lógica serverless em tempo real.

Também participei da modelagem de banco de dados e definição da arquitetura para suportar escalabilidade e evolução contínua do produto.

Meu trabalho envolve tanto backend (APIs, integrações, lógica de processamento) quanto frontend (React), criando interfaces intuitivas para fluxos complexos de geração de conteúdo.`,
      en: `I work on the full stack development of the platform, being responsible for designing and implementing features focused on AI content generation.

I built complete workflows for generating images, videos, and final compositions using asynchronous pipelines with multi-step processing (render, video, and concatenation).

The platform includes:

- Credit-based billing system
- Integration with AI providers (image and video) via fal.ai
- Asynchronous processing with queues and event-driven workflows
- Media storage and management
- Admin dashboard for feature control, plans, and AI prompt management

I use Convex as the backend for real-time data management, authentication, and serverless logic.

I also contributed to database modeling and system architecture to support scalability and continuous product evolution.

My work spans both backend (APIs, integrations, processing logic) and frontend (React), building intuitive interfaces for complex content generation workflows.`,
    },
    technologies: [
      "React",
      "TypeScript",
      "Convex",
      "Node.js",
      "Stripe",
      "Inngest",
      "Cloudflare R2",
      "fal.ai",
      "AI Integrations",
    ],
    media: [],
    link: "https://criarch.ai/",
  },

  {
    id: "athena-ti",
    type: "fulltime",
    company: "Athena Tecnologia da Informação",
    role: {
      pt: "Full Stack Developer",
      en: "Full Stack Developer",
    },
    period: { start: "2025-04", end: "2026-02" },
    shortDescription: {
      pt: "Desenvolvimento fullstack de plataforma de agentes de IA personalizados com controle de uso e integrações externas.",
      en: "Full-stack development of a customizable AI agents platform with usage control and external integrations.",
    },
    fullDescription: {
      pt: `Assumi o projeto a partir de uma base inicial e fui responsável por estruturar e desenvolver praticamente toda a evolução da plataforma.

Inicialmente, recebi a orientação de seguir o design existente e realizar pequenos ajustes, porém o produto passou por três reformulações completas de interface ao longo do desenvolvimento, exigindo reconstruções significativas e adaptação constante às novas diretrizes visuais, todas implementadas por mim de forma independente.

Atuei no desenvolvimento fullstack utilizando NestJS no backend, Prisma como ORM e MySQL como banco de dados, estruturando serviços, regras de negócio e modelagem de dados.

Implementei recursos essenciais para controle, autenticação e uso da plataforma:

- Controle diário e mensal de consumo por plano
- Sistema de monitoramento e agregação de tokens
- Autenticação baseada em permissões
- Lógica de consumo e controle de uso para múltiplos provedores de IA

Fui responsável por estudar e implementar toda a integração com a Stripe, desenvolvendo o fluxo completo de pagamentos e assinaturas: criação de planos, cobrança recorrente automática, cancelamento, alteração de plano e gestão de clientes.

Também integrei múltiplos provedores de IA, estruturando a lógica de consumo e controle de uso da plataforma.

O projeto exigiu alta capacidade de adaptação, aprendizado contínuo e autonomia técnica para transformar requisitos em uma solução escalável e funcional.`,
      en: `I took over the project from an initial foundation and became responsible for building and evolving most of the platform.

Initially, I was asked to follow the existing design and apply minor adjustments, but the product went through three complete UI redesigns during development, requiring significant rebuilds and continuous adaptation, all implemented independently by me.

I worked as a full-stack developer using NestJS for the backend, Prisma as ORM, and MySQL as the database, structuring services, business logic, and data modeling.

I implemented essential features for platform control, authentication, and usage:

- Daily and monthly usage control per subscription plan
- Token monitoring and aggregation systems
- Role-based authentication
- Consumption logic and usage control for multiple AI providers

I independently learned and implemented the full Stripe integration, building the complete subscription workflow: plan creation, recurring billing, plan upgrades and downgrades, cancellation flows, and customer management.

I also integrated multiple AI providers, designing the consumption logic and usage control mechanisms for the platform.

The project required strong autonomy, adaptability, continuous learning, and the ability to translate evolving requirements into a scalable and reliable solution.`,
    },
    technologies: [
      "NestJS",
      "React",
      "TypeScript",
      "Prisma",
      "Stripe API",
      "OpenAI",
      "Claude",
      "Gemini",
      "REST APIs",
    ],
    media: [
      {
        type: "video",
        src: "/media/projects/hubbia_2.mp4",
        alt: "Hubbia platform demo",
      },
      {
        type: "video",
        src: "/media/projects/hubbia_3.mp4",
        alt: "Hubbia platform demo",
      },
      {
        type: "video",
        src: "/media/projects/hubbia_4.mp4",
        alt: "Hubbia platform demo",
      },
    ],
  },
  {
    id: "software-precisao",
    type: "fulltime",
    company: "Software Precisão",
    role: {
      pt: "Back-End Developer",
      en: "Back-End Developer",
    },
    period: { start: "2024-08", end: "2025-07" },
    shortDescription: {
      pt: "Desenvolvimento backend e automações para múltiplos projetos, atuando na construção de APIs, modelagem de banco de dados e integrações com serviços externos.",
      en: "Backend development and automation across multiple projects, building APIs, designing databases, and integrating external services.",
    },
    fullDescription: {
      pt: `Atuei como desenvolvedora backend utilizando Node.js com TypeScript, sendo responsável pela implementação de APIs, regras de negócio e modelagem de banco de dados em diferentes projetos.

Trabalhei no backend do Ondish Foods, além de participar do desenvolvimento de sistemas para uma funerária e uma plataforma para corretores.

No projeto voltado para corretores, fui responsável por toda a estrutura backend, desde a escrita do código até a criação e modelagem do banco de dados. Também implementei a integração de pagamentos utilizando a API do Asaas, desenvolvendo fluxos de cobrança e gerenciamento financeiro.

Em outro projeto com proposta semelhante a um aplicativo de transporte, utilizei o Amazon Location Service para implementação de funcionalidades relacionadas à geolocalização e mapeamento.

Além disso, atuei em frentes de infraestrutura, automação e manutenção:

- MySQL e Sequelize
- Automação de pipelines CI/CD
- Monitoramento e manutenção de servidores
- Automações internas com Python e Selenium

Também participei de reuniões técnicas com clientes e atuei na resolução de problemas em produção, garantindo estabilidade e continuidade dos sistemas.`,
      en: `I worked as a backend developer using Node.js with TypeScript, being responsible for implementing APIs, business logic, and database modeling across multiple projects.

I contributed to the backend of Ondish Foods and also worked on systems for a funeral services company and a platform for brokers.

In the brokers platform project, I was fully responsible for the backend structure, from writing the code to designing and creating the database. I also implemented payment integration using the Asaas API, building billing flows and financial management logic.

In another project similar to a ride-hailing application, I used Amazon Location Service to implement geolocation and mapping functionalities.

Additionally, I worked across infrastructure, automation, and maintenance:

- MySQL and Sequelize
- CI/CD pipeline automation
- Server monitoring and maintenance
- Internal automation tools using Python and Selenium

I also participated in technical meetings with clients and handled production issue resolution, ensuring system stability and reliability.`,
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "MySQL",
      "Sequelize",
      "AWS",
      "Amazon Location Service",
      "Python",
      "Selenium",
      "CI/CD",
      "Asaas API",
    ],
    media: [],
  },
  {
    id: "andrinno",
    type: "freelance",
    company: "Andrinno Software House",
    role: {
      pt: "Backend Developer",
      en: "Backend Developer",
    },
    period: { start: "2024-08", end: "2024-10" },
    shortDescription: {
      pt: "Desenvolvimento de sistema de busca e comparação de passagens aéreas integrado a APIs de parceiros.",
      en: "Development of a flight search and comparison system integrated with partner APIs.",
    },
    fullDescription: {
      pt: `Desenvolvi um sistema robusto de busca de passagens aéreas integrando APIs como Travellink Wooba e Tk Milhas, permitindo comparação entre diferentes programas de fidelidade.

O foco foi criar uma base backend confiável para consultas complexas, com atenção a:

- Integrações estáveis com APIs de parceiros
- Processamento eficiente de dados
- Comparação entre diferentes programas de fidelidade
- Respostas rápidas para buscas com múltiplas variáveis`,
      en: `I developed a robust flight search system integrating partner APIs such as Travellink Wooba and Tk Milhas, enabling comparison across different loyalty programs.

The focus was to create a reliable backend foundation for complex queries, with attention to:

- Stable integrations with partner APIs
- Efficient data processing
- Comparison across different loyalty programs
- Fast responses for searches with multiple variables`,
    },
    technologies: [
      "Node.js",
      "API Integration",
      "REST",
      "Backend Architecture",
    ],
    media: [],
  },
  {
    id: "devnology",
    type: "fulltime",
    company: "Devnology",
    role: {
      pt: "Back-End Developer (RPA)",
      en: "Back-End Developer (RPA)",
    },
    period: { start: "2024-05", end: "2024-08" },
    shortDescription: {
      pt: "Desenvolvimento de automações RPA para emissão de passagens aéreas e extração de dados.",
      en: "Development of RPA automations for airline ticket issuance and data extraction.",
    },
    fullDescription: {
      pt: `Contribuí para soluções de automação de processos robóticos (RPA) para emissão de passagens das principais companhias aéreas do Brasil, incluindo LATAM, utilizadas pela MaxMilhas.

Desenvolvi e mantive automações voltadas a processos críticos de operação, incluindo:

- Extração de dados de contas
- Criação de queries MySQL
- Correção de bugs
- Refatoração de sistemas existentes

O trabalho foi realizado utilizando Node.js, Python e TypeScript, com foco em estabilidade, manutenção e melhoria contínua das automações.`,
      en: `I contributed to robotic process automation (RPA) solutions for airline ticket issuance for major Brazilian airlines, including LATAM, used by MaxMilhas.

I built and maintained automations for critical operational processes, including:

- Account data extraction
- MySQL query creation
- Bug fixes
- Refactoring existing systems

The work was done using Node.js, Python, and TypeScript, with a focus on stability, maintainability, and continuous improvement of the automations.`,
    },
    technologies: [
      "Node.js",
      "Python",
      "TypeScript",
      "RPA",
      "MySQL",
      "GitLab CI/CD",
    ],
    media: [],
  },
];

