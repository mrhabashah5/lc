"use client";

import { useState } from "react";
import { Check, Printer } from "lucide-react";

const common = {
  before: [
    "Ask the lender for the final payoff or settlement figure in writing",
    "Check the figure against your statements and receipts",
  ],
  pay: ["Pay only through the lender's official channels", "Save the receipt or transaction ID"],
  after: [
    "Request a clearance letter (NOC) in writing, quoting your CNIC and account number",
    "Check the letter names you, the account, the closure date and says nothing is outstanding",
    "Check your credit report a few weeks later to confirm the loan shows as closed",
    "Keep all documents together, with scanned copies",
  ],
};

const extra: Record<string, { label: string; steps: string[] }> = {
  personal: { label: "Personal loan", steps: [] },
  card: {
    label: "Credit card",
    steps: [
      "Ask for written confirmation that the card account itself is closed",
      "Cancel any standing instructions or subscriptions billed to the card",
      "Cut up the card and check no further statements arrive",
    ],
  },
  auto: {
    label: "Car finance",
    steps: [
      "Collect the bank's NOC for the vehicle and check every vehicle detail on it",
      "Collect your original vehicle documents from the bank",
      "Pay any outstanding token tax",
      "Apply at your provincial Excise office to remove the bank's lien",
      "Arrange your own car insurance if the bank's policy ends",
    ],
  },
  home: {
    label: "Home finance",
    steps: [
      "Collect your original title documents from the lender",
      "Arrange release of any registered charge or mortgage",
      "Consider independent legal advice to confirm the title is clear",
    ],
  },
  app: {
    label: "Loan app",
    steps: [
      "Confirm the app is on SECP's list of approved digital lending apps",
      "Screenshot the amount due before paying",
      "Screenshot the loan's closed or repaid status after paying",
      "Remove the app's permissions once you have written confirmation",
    ],
  },
  settled: {
    label: "Settled loan",
    steps: [
      "Get the settlement terms in writing before paying",
      "Ask how the account will be reported to credit bureaus",
      "Make sure the clearance letter refers to the settlement",
    ],
  },
};

export function ClearanceChecklist() {
  const [type, setType] = useState("personal");
  const [done, setDone] = useState<Record<string, boolean>>({});

  const groups = [
    { title: "Before the final payment", items: common.before },
    { title: "Making the payment", items: common.pay },
    { title: `Specific to ${extra[type].label.toLowerCase()}`, items: extra[type].steps },
    { title: "After the payment", items: common.after },
  ].filter((g) => g.items.length);
  const all = groups.flatMap((g) => g.items);
  const count = all.filter((i) => done[i]).length;
  const pct = all.length ? Math.round((count / all.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <fieldset className="card self-start sm:p-6 print:hidden">
        <legend className="sr-only">Type of loan</legend>
        <h2 className="text-lg font-extrabold">Your type of loan</h2>
        <div className="mt-4 space-y-2">
          {Object.entries(extra).map(([k, v]) => (
            <label
              key={k}
              className={`block cursor-pointer rounded-xl border-2 px-4 py-3 font-bold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-sky-ink ${
                type === k ? "border-sky-ink bg-sky-light/30 text-navy" : "border-field text-navy hover:border-sky-ink"
              }`}
            >
              <input type="radio" name="loanType" value={k} className="sr-only" checked={type === k} onChange={() => setType(k)} />
              {v.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="card sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold">Checklist: {extra[type].label}</h2>
          <button type="button" onClick={() => window.print()} className="btn btn-secondary btn-sm print:hidden">
            <Printer size={16} aria-hidden="true" /> Print
          </button>
        </div>
        <div className="mt-4" aria-live="polite">
          <div className="flex items-center justify-between text-sm font-semibold text-navy">
            <span>
              {count} of {all.length} done
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Checklist progress" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-sky-ink transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <section key={g.title}>
              <h3 className="text-sm font-bold tracking-widest text-sky-ink uppercase">{g.title}</h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-surface has-focus-visible:outline-3 has-focus-visible:outline-sky-ink">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={!!done[item]}
                        onChange={(e) => setDone((d) => ({ ...d, [item]: e.target.checked }))}
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          done[item] ? "border-sky-ink bg-sky-ink text-white" : "border-field bg-white"
                        }`}
                      >
                        {done[item] && <Check size={16} strokeWidth={3.5} />}
                      </span>
                      <span className={`leading-relaxed ${done[item] ? "text-muted line-through" : "text-ink"}`}>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
