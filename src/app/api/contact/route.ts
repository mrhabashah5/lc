import { NextResponse } from "next/server";
import { createMessage } from "@/lib/db";
import { notifyTeam } from "@/lib/mail";
import { isValidEmail, isValidPhone, type FieldErrors } from "@/lib/options";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const m = {
    name: str(body.name, 120),
    email: str(body.email, 160),
    phone: str(body.phone, 30),
    subject: str(body.subject, 160),
    message: str(body.message, 3000),
  };

  const errors: FieldErrors = {};
  if (m.name.length < 2) errors.name = "Please enter your name.";
  if (!m.email && !m.phone) errors.email = "Please enter an email address or a phone number.";
  if (m.email && !isValidEmail(m.email)) errors.email = "Please enter a valid email address.";
  if (m.phone && !isValidPhone(m.phone)) errors.phone = "Please enter a valid phone number.";
  if (m.message.length < 10) errors.message = "Please write a short message (at least 10 characters).";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the form.", errors }, { status: 422 });
  }

  try {
    await createMessage(m);
  } catch (err) {
    console.error("[contact] save failed:", err);
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please try again or contact us directly." },
      { status: 500 },
    );
  }

  await notifyTeam(
    `New contact message: ${m.subject || "General enquiry"}`,
    `Name: ${m.name}\nEmail: ${m.email || "-"}\nPhone: ${m.phone || "-"}\n\n${m.message}`,
    m.email,
  );

  return NextResponse.json({ ok: true });
}
