"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SiMedium } from "react-icons/si";
import { useTranslation } from "@/components/language-provider";
import { socials } from "@/data/resume";

const ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  github: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  medium: <SiMedium className="h-[19px] w-[19px]" aria-hidden="true" />,
};

const EMAIL_ADDRESS = "andressaricardo.developer@gmail.com";
type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL_ADDRESS;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          detail?: string;
        } | null;
        throw new Error(payload?.detail ?? "Unable to send message");
      }
      form.reset();
      setStatus("success");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted/55 focus:border-foreground/35";

  return (
    <section id="contact" className="scroll-mt-20 py-8 sm:py-12 lg:py-14">
      <div className="grid gap-12 xl:grid-cols-[minmax(430px,0.95fr)_minmax(0,1.05fr)] xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="max-w-sm font-mono text-xs leading-6 text-muted">
            {t.contact.subtitle}
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-2xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted">
                  {ICONS.email}
                </span>
                <div className="min-w-0 flex-1 basis-56">
                  <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                    {t.contact.email}
                  </p>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="block break-all font-mono text-[11px] text-foreground hover:text-accent sm:break-normal"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-auto shrink-0 rounded-full border border-border px-3 py-1.5 font-mono text-[9px] uppercase text-muted transition-colors hover:text-foreground"
                >
                  {copied ? t.contact.copied : t.contact.copyEmail}
                </button>
              </div>
            </div>

            {socials
              .filter((social) => social.icon !== "email")
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-foreground/25"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted group-hover:text-foreground">
                    {ICONS[social.icon]}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                      {
                        t.contact[
                          social.icon as "github" | "linkedin" | "medium"
                        ]
                      }
                    </p>
                    <p className="font-mono text-[11px] text-foreground">
                      {social.name}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border p-5 sm:p-7"
        >
          <div className="mb-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {t.contact.formEyebrow}
            </p>
            <h2 className="mt-2 text-xl font-medium tracking-[-0.025em] text-foreground sm:text-2xl">
              {t.contact.formTitle}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              {t.contact.name}
              <input
                className={fieldClass}
                type="text"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                placeholder={t.contact.namePlaceholder}
              />
            </label>
            <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              {t.contact.senderEmail}
              <input
                className={fieldClass}
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={160}
                placeholder={t.contact.emailPlaceholder}
              />
            </label>
          </div>
          <label className="mt-5 block font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            {t.contact.subject}
            <input
              className={fieldClass}
              type="text"
              name="subject"
              required
              minLength={3}
              maxLength={120}
              placeholder={t.contact.subjectPlaceholder}
            />
          </label>
          <label className="mt-5 block font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            {t.contact.message}
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              required
              minLength={10}
              maxLength={4000}
              placeholder={t.contact.messagePlaceholder}
            />
          </label>
          <label className="absolute -left-[9999px]" aria-hidden="true">
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-6 font-mono text-[10px] uppercase tracking-[0.06em] text-background transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-55"
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
            </button>
            <p
              className={`font-mono text-[10px] leading-5 ${status === "error" ? "text-red-400" : "text-muted"}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" && t.contact.success}
              {status === "error" && t.contact.error}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
