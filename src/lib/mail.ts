import "server-only";
import nodemailer from "nodemailer";
import { site } from "./site";

function transport() {
  if (!process.env.SMTP_HOST) return null;
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

const from = () => process.env.MAIL_FROM ?? `ByeByeLoan <${site.email}>`;

/** Sends an email if SMTP is configured. Never throws: a mail failure must not lose a submission. */
export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }) {
  const t = transport();
  if (!t) return false;
  try {
    await t.sendMail({ from: from(), ...opts });
    return true;
  } catch (err) {
    console.error("[mail] send failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export function notifyTeam(subject: string, text: string, replyTo?: string) {
  const to = process.env.MAIL_TO;
  if (!to) return Promise.resolve(false);
  return sendMail({ to, subject, text, replyTo: replyTo || undefined });
}
