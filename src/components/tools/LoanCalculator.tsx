"use client";

import { useMemo, useState } from "react";
import { pkr } from "@/lib/tools";
import { NumberField } from "./NumberField";

type Method = "reducing" | "flat";

function schedule(principal: number, annualRate: number, months: number, method: Method) {
  const rows: { month: number; payment: number; markup: number; principal: number; balance: number }[] = [];
  if (method === "flat") {
    const totalMarkup = principal * (annualRate / 100) * (months / 12);
    const payment = (principal + totalMarkup) / months;
    let balance = principal;
    for (let m = 1; m <= months; m++) {
      const p = principal / months;
      balance -= p;
      rows.push({ month: m, payment, markup: totalMarkup / months, principal: p, balance: Math.max(0, balance) });
    }
    return { payment, rows };
  }
  const r = annualRate / 100 / 12;
  const payment = r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const markup = balance * r;
    const p = payment - markup;
    balance -= p;
    rows.push({ month: m, payment, markup, principal: p, balance: Math.max(0, balance) });
  }
  return { payment, rows };
}

export function LoanCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("24");
  const [months, setMonths] = useState("24");
  const [method, setMethod] = useState<Method>("reducing");
  const [showAll, setShowAll] = useState(false);

  const a = Number(amount);
  const r = Number(rate);
  const n = Math.round(Number(months));
  const errors = {
    amount: !(a > 0) ? "Enter a loan amount greater than zero." : a > 1e10 ? "Enter a smaller amount." : undefined,
    rate: !(r >= 0) || r > 200 ? "Enter an annual rate between 0 and 200%." : undefined,
    months: !(n >= 1) || n > 360 ? "Enter a term between 1 and 360 months." : undefined,
  };
  const valid = !errors.amount && !errors.rate && !errors.months;

  const result = useMemo(() => (valid ? schedule(a, r, n, method) : null), [valid, a, r, n, method]);
  const total = result ? result.payment * n : 0;
  const markup = total - a;
  const rows = result ? (showAll ? result.rows : result.rows.slice(0, 12)) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="card space-y-5 sm:p-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <h2 className="text-xl font-extrabold">Your loan details</h2>
        <NumberField id="amount" label="Loan amount" prefix="Rs" value={amount} onChange={setAmount} error={errors.amount} step="1000" />
        <NumberField
          id="rate"
          label="Annual mark-up rate"
          suffix="% a year"
          value={rate}
          onChange={setRate}
          error={errors.rate}
          step="0.1"
          hint="Use the rate shown in your offer letter or key fact statement."
        />
        <NumberField id="months" label="Loan term" suffix="months" value={months} onChange={setMonths} error={errors.months} step="1" min={1} />
        <fieldset>
          <legend className="label">How is mark-up charged?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                ["reducing", "Reducing balance", "Mark-up on what you still owe (most common)"],
                ["flat", "Flat rate", "Mark-up on the original amount for the whole term"],
              ] as const
            ).map(([v, l, d]) => (
              <label
                key={v}
                className={`cursor-pointer rounded-xl border-2 p-3.5 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-sky-ink ${
                  method === v ? "border-sky-ink bg-sky-light/30" : "border-field hover:border-sky-ink"
                }`}
              >
                <input type="radio" name="method" value={v} className="sr-only" checked={method === v} onChange={() => setMethod(v)} />
                <span className="block font-bold text-navy">{l}</span>
                <span className="mt-0.5 block text-sm text-muted">{d}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div aria-live="polite">
        {result ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
              <p className="text-sm font-bold tracking-widest text-sky-light uppercase">Monthly instalment</p>
              <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">{pkr(result.payment)}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
                <div>
                  <dt className="text-sm text-white/80">Total mark-up</dt>
                  <dd className="text-xl font-bold text-white">{pkr(markup)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/80">Total repayment</dt>
                  <dd className="text-xl font-bold text-white">{pkr(total)}</dd>
                </div>
              </dl>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Repayment schedule">
              <table className="w-full min-w-[480px] text-left text-sm">
                <caption className="bg-surface px-4 py-3 text-left font-bold text-navy">
                  Repayment schedule {showAll ? "" : "(first 12 months)"}
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-2.5">Month</th>
                    <th scope="col" className="px-4 py-2.5">Instalment</th>
                    <th scope="col" className="px-4 py-2.5">Mark-up</th>
                    <th scope="col" className="px-4 py-2.5">Principal</th>
                    <th scope="col" className="px-4 py-2.5">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((row) => (
                    <tr key={row.month} className="even:bg-surface">
                      <th scope="row" className="px-4 py-2 font-semibold text-navy">{row.month}</th>
                      <td className="px-4 py-2">{pkr(row.payment)}</td>
                      <td className="px-4 py-2">{pkr(row.markup)}</td>
                      <td className="px-4 py-2">{pkr(row.principal)}</td>
                      <td className="px-4 py-2">{pkr(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.rows.length > 12 && (
              <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-secondary btn-sm">
                {showAll ? "Show first 12 months" : `Show all ${result.rows.length} months`}
              </button>
            )}
          </div>
        ) : (
          <p className="card text-muted">Enter valid loan details to see your results.</p>
        )}
      </div>
    </div>
  );
}
