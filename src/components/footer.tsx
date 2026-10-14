"use client";

import { useTranslation } from "@/components/language-provider";
import { socials } from "@/data/resume";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  github: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.8 1-1 2-1 3.5v4" />
    </svg>
  ),
  linkedin: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1728px] flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:px-8 lg:px-12">
        <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
          © {new Date().getFullYear()} {t.header.name}
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.icon === "email" ? undefined : "_blank"}
              rel={social.icon === "email" ? undefined : "noopener noreferrer"}
              aria-label={social.name}
              className="text-muted transition-colors hover:text-foreground"
            >
              {SOCIAL_ICONS[social.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
