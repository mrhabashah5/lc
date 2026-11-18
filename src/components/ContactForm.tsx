"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { FieldErrors } from "@/lib/options";

const empty = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

export function ContactForm() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof empty, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setSent(true);
        trackEvent("contact_form_submit", { form: "contact" });
      } else {
        setErrors(json?.errors ?? {});
        setServerError(json?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="card text-center sm:p-12" role="status">
        <CircleCheck size={52} className="mx-auto text-brand" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold">Message sent</h2>
        <p className="lead mt-2">Thank you. We will get back to you as soon as we can.</p>
      </div>
    );
  }

  const field = (
    k: "name" | "email" | "phone" | "subject",
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    optional = false,
  ) => (
    <div>
      <label htmlFor={`c-${k}`} className="label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={`c-${k}`}
        className="field"
        value={data[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `c-${k}-error` : undefined}
        {...props}
      />
      {errors[k] && (
        <p id={`c-${k}-error`} className="field-error" role="alert">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-5 sm:grid-cols-2 sm:p-10">
      <h2 className="text-2xl font-extrabold sm:col-span-2">Send us a message</h2>
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      {field("name", "Your name", { autoComplete: "name" })}
      {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "0300 1234567" }, true)}
      {field("email", "Email", { type: "email", autoComplete: "email" })}
      {field("subject", "Subject", {}, true)}
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="label">
          Message
        </label>
        <textarea
          id="c-message"
          rows={5}
          maxLength={3000}
          className="field"
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "c-message-error" : undefined}
        />
        {errors.message && (
          <p id="c-message-error" className="field-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      {serverError && (
        <p className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm font-semibold text-danger sm:col-span-2" role="alert">
          {serverError}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending}>
          {sending ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
