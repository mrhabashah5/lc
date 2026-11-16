// Shared between the public forms, API validation and the admin dashboard.

export const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;

export const loanTypes = [
  "Personal loan",
  "Credit card",
  "Auto finance",
  "Home finance",
  "Business / SME loan",
  "Microfinance or digital lending app",
  "Other",
] as const;

export const amountRanges = [
  "Under PKR 100,000",
  "PKR 100,000 – 500,000",
  "PKR 500,000 – 1,000,000",
  "PKR 1,000,000 – 5,000,000",
  "Over PKR 5,000,000",
  "Not sure",
] as const;

export const loanStatuses = [
  "Payments are up to date",
  "1–3 months overdue",
  "More than 3 months overdue",
  "Legal or recovery notice received",
  "Already paid or settled – need clearance",
] as const;

export const servicesNeeded = ["Loan settlement", "Loan clearance", "Not sure yet"] as const;

export const consultationStatuses = ["new", "contacted", "in_progress", "closed"] as const;
export type ConsultationStatus = (typeof consultationStatuses)[number];

export const statusLabels: Record<ConsultationStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  closed: "Closed",
};

export type ConsultationInput = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  contactMethod: string;
  loanType: string;
  lenderName: string;
  amountRange: string;
  loanStatus: string;
  serviceNeeded: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<string, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(v: string) {
  return emailRe.test(v);
}

export function isValidPhone(v: string) {
  const digits = v.replace(/[\s\-()]/g, "");
  return /^\+?\d{10,15}$/.test(digits);
}

/** Validates one step (1–3) or, with no step, the whole form. Runs on client and server. */
export function validateConsultation(d: ConsultationInput, step?: number): FieldErrors {
  const e: FieldErrors = {};
  const all = step === undefined;

  if (all || step === 1) {
    if (d.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
    if (!isValidPhone(d.phone)) e.phone = "Please enter a valid phone number, e.g. 0300 1234567.";
    if (d.email && !isValidEmail(d.email)) e.email = "Please enter a valid email address.";
    if (d.city.trim().length < 2) e.city = "Please enter your city.";
    if (!(contactMethods as readonly string[]).includes(d.contactMethod))
      e.contactMethod = "Please choose how we should contact you.";
    if (d.contactMethod === "Email" && !d.email)
      e.email = "Please enter your email address so we can reply by email.";
  }
  if (all || step === 2) {
    if (!(loanTypes as readonly string[]).includes(d.loanType)) e.loanType = "Please select a loan type.";
    if (!(amountRanges as readonly string[]).includes(d.amountRange))
      e.amountRange = "Please select an approximate amount.";
    if (!(loanStatuses as readonly string[]).includes(d.loanStatus))
      e.loanStatus = "Please select the current status.";
    if (!(servicesNeeded as readonly string[]).includes(d.serviceNeeded))
      e.serviceNeeded = "Please select the help you need.";
  }
  if (all || step === 3) {
    if (!d.consent) e.consent = "Please confirm to continue.";
  }
  return e;
}
