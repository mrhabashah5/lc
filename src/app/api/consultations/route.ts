import { NextResponse } from "next/server";
import { createConsultation } from "@/lib/db";
import { notifyTeam, sendMail } from "@/lib/mail";
import { validateConsultation, type ConsultationInput } from "@/lib/options";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!rateLimit(`consult:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
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

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.website, 200)) return NextResponse.json({ ok: true, reference: "LC-RECEIVED" });

  const data: ConsultationInput = {
    fullName: str(body.fullName, 120),
    phone: str(body.phone, 30),
    email: str(body.email, 160),
    city: str(body.city, 80),
    contactMethod: str(body.contactMethod, 30),
    loanType: str(body.loanType, 60),
    lenderName: str(body.lenderName, 120),
    amountRange: str(body.amountRange, 60),
    loanStatus: str(body.loanStatus, 60),
    serviceNeeded: str(body.serviceNeeded, 40),
    message: str(body.message, 2000),
    consent: body.consent === true,
  };

  const errors = validateConsultation(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the form.", errors }, { status: 422 });
  }

  let reference: string;
  try {
    reference = await createConsultation(data);
  } catch (err) {
    console.error("[consultations] save failed:", err);
    return NextResponse.json(
      { ok: false, error: "We could not save your request. Please try again or contact us directly." },
      { status: 500 },
    );
  }

  const summary = [
    `Reference: ${reference}`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `City: ${data.city}`,
    `Preferred contact: ${data.contactMethod}`,
    `Service needed: ${data.serviceNeeded}`,
    `Loan type: ${data.loanType}`,
    `Lender: ${data.lenderName || "-"}`,
    `Approx. amount: ${data.amountRange}`,
    `Status: ${data.loanStatus}`,
    "",
    data.message || "(no message)",
  ].join("\n");

  await Promise.all([
    notifyTeam(`New consultation request ${reference}`, summary, data.email),
    data.email
      ? sendMail({
          to: data.email,
          subject: `We have received your request (${reference})`,
          text: `Dear ${data.fullName},\n\nThank you for contacting ${site.name}. We have received your consultation request and a consultant will contact you by ${data.contactMethod.toLowerCase()}.\n\nYour reference: ${reference}\n\nFor your security, we will never ask for your PIN, password, OTP or full card number.\n\n${site.name}\n${site.phone}`,
        })
      : null,
  ]);

  return NextResponse.json({ ok: true, reference });
}
