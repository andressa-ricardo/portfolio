import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";
import { Experience } from "@/sections/experience";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Education } from "@/sections/education";
import { Courses } from "@/sections/courses";
import { Languages } from "@/sections/languages-section";
import { Contact } from "@/sections/contact";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}${siteConfig.image}`,
        email: siteConfig.email,
        jobTitle: siteConfig.profession,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rio de Janeiro",
          addressCountry: "BR",
        },
        sameAs: [siteConfig.linkedIn, siteConfig.github],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "React Native",
          "Mobile Development",
          "Web Development",
          "Frontend Development",
          "Full Stack Development",
        ],
      },
      {
        "@type": "WebSite",
        name: siteConfig.shortName,
        url: siteConfig.siteUrl,
        description: siteConfig.description,
        inLanguage: ["pt-BR", "en-US"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Courses />
        <Languages />
        <Contact />
      </main>
    </>
  );
}
