"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck, MessageCircle } from "lucide-react";
import {
  amountRanges,
  contactMethods,
  loanStatuses,
  loanTypes,
  servicesNeeded,
  validateConsultation,
  type ConsultationInput,
  type FieldErrors,
} from "@/lib/options";
import { loanApps } from "@/lib/loan-apps";
import { trackEvent } from "@/lib/analytics";
import { whatsappLink } from "@/lib/site";

const stepNames = ["Your details", "Your loan", "Review & send"];

const empty: ConsultationInput = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  contactMethod: "",
  loanType: "",
  lenderName: "",
  amountRange: "",
  loanStatus: "",
  serviceNeeded: "",
  message: "",
  consent: false,
};

export function ConsultationForm({ initialApp }: { initialApp?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ConsultationInput>(() =>
    initialApp
      ? {
          ...empty,
          lenderName: initialApp,
          loanType: "Microfinance or digital lending app",
          serviceNeeded: "Closing a loan app loan",
        }
      : empty,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ConsultationInput>(k: K, v: ConsultationInput[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  function next() {
    const e = validateConsultation(data, step);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep((s) => s + 1);
      scrollTop();
    }
  }

  function back() {
    setErrors({});
    setServerError("");
    setStep((s) => s - 1);
    scrollTop();
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 3) return next();
    const e = validateConsultation(data);
    setErrors(e);
    if (Object.keys(e).length) return;

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setReference(json.reference);
        trackEvent("generate_lead", { form: "consultation", service: data.serviceNeeded, loan_type: data.loanType });
        scrollTop();
      } else {
        if (json?.errors) setErrors(json.errors);
        setServerError(json?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (reference) {
    return (
      <div ref={topRef} className="card scroll-mt-28 text-center sm:p-12" role="status">
        <CircleCheck size={56} className="mx-auto text-brand" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-extrabold">Request received</h2>
        <p className="lead mx-auto mt-3 max-w-md">
          Thank you, {data.fullName.split(" ")[0]}. A consultant will contact you by{" "}
          {data.contactMethod.toLowerCase()}.
        </p>
        <p className="mx-auto mt-6 inline-block rounded-xl bg-brand-soft/40 px-6 py-3 text-brand-dark">
          Your reference: <strong className="font-extrabold">{reference}</strong>
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted">
          For your security, we will never ask for your PIN, password, OTP or full card number.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(`Hello ByeByeLoan, I have submitted a consultation request. My reference is ${reference}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={18} aria-hidden="true" /> Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/" className="btn btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error" role="alert">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <div ref={topRef} className="card scroll-mt-28 sm:p-10">
      {/* Blue progress indicator */}
      <div className="mb-8">
        <ol className="flex items-center">
          {stepNames.map((name, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <li key={name} className={`flex items-center ${i < stepNames.length - 1 ? "flex-1" : ""}`}>
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                  <span
                    aria-current={current ? "step" : undefined}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-extrabold transition-colors ${
                      done || current ? "bg-brand-ink text-white" : "border-2 border-field bg-white text-muted"
                    }`}
                  >
                    {done ? <Check size={18} strokeWidth={3.5} aria-hidden="true" /> : n}
                  </span>
                  <span
                    className={`text-[13px] font-bold whitespace-nowrap sm:text-sm ${current || done ? "text-brand-dark" : "text-muted"}`}
                  >
                    {name}
                  </span>
                </div>
                {i < stepNames.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`mx-2 mb-6 h-1 flex-1 rounded-full sm:mx-4 sm:mb-0 ${done ? "bg-brand" : "bg-line"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          Step {step} of 3: {stepNames[step - 1]}
        </p>
      </div>

      {initialApp && data.lenderName === initialApp && (
        <p className="mb-6 rounded-xl bg-brand-soft/40 px-4 py-3 text-sm text-brand-dark">
          Requesting clearance help for <strong className="font-extrabold">{initialApp}</strong>. You
          can change this in step 2.
        </p>
      )}

      <form onSubmit={submit} noValidate>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        {step === 1 && (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-5 text-2xl font-extrabold text-brand-dark sm:col-span-2">Tell us about you</legend>
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="label">
                Full name
              </label>
              <input
                id="fullName"
                className="field"
                autoComplete="name"
                value={data.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                {...aria("fullName")}
              />
              {err("fullName")}
            </div>
            <div>
              <label htmlFor="phone" className="label">
                Mobile number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                className="field"
                placeholder="0300 1234567"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                {...aria("phone")}
              />
              {err("phone")}
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                className="field"
                autoComplete="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                {...aria("email")}
              />
              {err("email")}
            </div>
            <div>
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                id="city"
                className="field"
                autoComplete="address-level2"
                value={data.city}
                onChange={(e) => set("city", e.target.value)}
                {...aria("city")}
              />
              {err("city")}
            </div>
            <div>
              <span id="contactMethod-label" className="label">
                Preferred contact method
              </span>
              <div role="radiogroup" aria-labelledby="contactMethod-label" className="flex flex-wrap gap-2">
                {contactMethods.map((m) => (
                  <label
                    key={m}
                    className={`cursor-pointer rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-ink ${
                      data.contactMethod === m
                        ? "border-brand-ink bg-brand-soft/40 text-brand-dark"
                        : "border-field bg-white text-muted hover:border-brand-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      className="sr-only"
                      checked={data.contactMethod === m}
                      onChange={() => set("contactMethod", m)}
                    />
                    {m}
                  </label>
                ))}
              </div>
              {err("contactMethod")}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-5 text-2xl font-extrabold text-brand-dark sm:col-span-2">About your loan</legend>
            <Select id="serviceNeeded" label="What do you need help with?" options={servicesNeeded} value={data.serviceNeeded} onChange={(v) => set("serviceNeeded", v)} error={errors.serviceNeeded} />
            <Select id="loanType" label="Type of loan" options={loanTypes} value={data.loanType} onChange={(v) => set("loanType", v)} error={errors.loanType} />
            <div>
              <label htmlFor="lenderName" className="label">
                Bank, lender or loan app <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="lenderName"
                className="field"
                list="lender-suggestions"
                autoComplete="off"
                value={data.lenderName}
                onChange={(e) => set("lenderName", e.target.value)}
              />
              <datalist id="lender-suggestions">
                {loanApps.map((a) => (
                  <option key={a.name} value={a.name} />
                ))}
              </datalist>
            </div>
            <Select id="amountRange" label="Approximate outstanding amount" options={amountRanges} value={data.amountRange} onChange={(v) => set("amountRange", v)} error={errors.amountRange} />
            <div className="sm:col-span-2">
              <Select id="loanStatus" label="Current status" options={loanStatuses} value={data.loanStatus} onChange={(v) => set("loanStatus", v)} error={errors.loanStatus} />
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="mb-5 text-2xl font-extrabold text-brand-dark">Review and send</legend>
            <dl className="mb-6 grid gap-x-8 gap-y-3 rounded-xl bg-surface p-5 text-sm sm:grid-cols-2">
              {[
                ["Name", data.fullName],
                ["Mobile", data.phone],
                ["Email", data.email || "Not provided"],
                ["City", data.city],
                ["Contact by", data.contactMethod],
                ["Help needed", data.serviceNeeded],
                ["Loan type", data.loanType],
                ["Lender", data.lenderName || "Not provided"],
                ["Amount", data.amountRange],
                ["Status", data.loanStatus],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold text-brand-dark">{v}</dd>
                </div>
              ))}
            </dl>
            <label htmlFor="message" className="label">
              Anything else we should know? <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              maxLength={2000}
              className="field"
              value={data.message}
              onChange={(e) => set("message", e.target.value)}
            />
            <p className="mt-1.5 text-sm text-muted">
              Please do not include PINs, passwords, OTPs or full card numbers.
            </p>
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
                checked={data.consent}
                onChange={(e) => set("consent", e.target.checked)}
                {...aria("consent")}
              />
              <span>
                I agree to ByeByeLoan contacting me about this request and to the handling of my
                information as described in the{" "}
                <Link href="/privacy-policy" target="_blank" className="font-semibold text-brand-dark underline decoration-brand underline-offset-4">
                  Privacy Policy
                </Link>
                . I understand that ByeByeLoan is not a lender and cannot guarantee any outcome, as
                explained in the{" "}
                <Link href="/disclaimer" target="_blank" className="font-semibold text-brand-dark underline decoration-brand underline-offset-4">
                  Disclaimer
                </Link>
                .
              </span>
            </label>
            {err("consent")}
          </fieldset>
        )}

        {serverError && (
          <p className="mt-6 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm font-semibold text-danger" role="alert">
            {serverError}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <button type="button" onClick={back} className="btn btn-secondary" disabled={sending}>
              <ArrowLeft size={18} aria-hidden="true" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              Continue <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Sending…" : "Submit Request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Select({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="">Please select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
