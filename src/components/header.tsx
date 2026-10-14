"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "@/components/language-provider";

const NAV_ITEMS = [
  { href: "/sobre", key: "about" },
  { href: "/trajetoria", key: "journey" },
  { href: "/projetos", key: "projects" },
  { href: "/universo-tech", key: "tech" },
  { href: "/alem-do-codigo", key: "beyond" },
  { href: "/contato", key: "contact" },
] as const;

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1728px] items-center justify-between gap-4 px-5 sm:h-[84px] sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-5"
          onClick={() => setOpen(false)}
        >
          <span className="text-[2rem] font-semibold leading-none tracking-[-0.08em] text-foreground">
            ar<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.home.closeMenu : t.home.openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.04]"
          >
            {open ? (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 5 19 19M19 5 5 19" />
              </svg>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="site-menu"
          className="absolute inset-x-0 top-full border-b border-border bg-background/98 px-5 py-4 shadow-2xl shadow-black/5 backdrop-blur-xl sm:px-8 lg:px-12"
        >
          <div className="mx-auto grid w-full max-w-[1728px] gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {NAV_ITEMS.map(({ href, key }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-mono text-xs transition-colors hover:bg-foreground/[0.04] ${pathname === href ? "bg-foreground/[0.04] text-foreground" : "text-muted hover:text-foreground"}`}
              >
                <span className="font-mono text-[9px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {t.home.items[key]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
