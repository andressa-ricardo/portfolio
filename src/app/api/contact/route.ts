import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip))
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (clean(payload.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160);
  const subject = clean(payload.subject, 120);
  const message = clean(payload.message, 4000);
  if (
    name.length < 2 ||
    subject.length < 3 ||
    message.length < 10 ||
    !EMAIL_PATTERN.test(email)
  ) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 },
    );

  const recipient =
    process.env.CONTACT_EMAIL ?? "andressaricardo.developer@gmail.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject: `[Portfólio] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6"><p><strong>Nova mensagem pelo portfólio</strong></p><p><strong>Nome:</strong> ${safeName}<br /><strong>Email:</strong> ${safeEmail}<br /><strong>Assunto:</strong> ${safeSubject}</p><p>${safeMessage}</p></div>`,
    }),
  });

  if (!response.ok) {
    const resendError = (await response.json().catch(() => null)) as {
      message?: string;
      name?: string;
    } | null;

    console.error("Resend rejected the contact email", {
      status: response.status,
      name: resendError?.name,
      message: resendError?.message,
    });

    return NextResponse.json(
      {
        error: "Unable to send email",
        ...(process.env.NODE_ENV === "development" && {
          detail:
            resendError?.message ?? `Resend returned HTTP ${response.status}`,
        }),
      },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
