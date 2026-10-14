import { HomeHub } from "@/components/home-hub";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.siteUrl,
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
          "Web Development",
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
      <HomeHub />
    </>
  );
}
