"use client";

import { useState } from "react";
import { pkr } from "@/lib/tools";
import { NumberField } from "./NumberField";

export function SettlementCalculator() {
  const [balance, setBalance] = useState("300000");
  const [offer, setOffer] = useState("210000");
  const [instalments, setInstalments] = useState("1");

  const b = Number(balance);
  const o = Number(offer);
  const n = Math.round(Number(instalments));
  const errors = {
    balance: !(b > 0) ? "Enter your outstanding balance." : undefined,
    offer: !(o > 0) ? "Enter the settlement amount offered." : o > b ? "The offer is higher than the balance. Check both figures." : undefined,
    instalments: !(n >= 1) || n > 60 ? "Enter between 1 and 60 payments." : undefined,
  };
  const valid = !errors.balance && !errors.offer && !errors.instalments;
  const saving = b - o;
  const pctOfBalance = (o / b) * 100;
  const pctSaved = (saving / b) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="card space-y-5 sm:p-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <h2 className="text-xl font-extrabold">Your figures</h2>
        <NumberField
          id="balance"
          label="Outstanding balance"
          prefix="Rs"
          value={balance}
          onChange={setBalance}
          error={errors.balance}
          step="1000"
          hint="The total your lender says you owe today, including charges."
        />
        <NumberField
          id="offer"
          label="Settlement amount offered"
          prefix="Rs"
          value={offer}
          onChange={setOffer}
          error={errors.offer}
          step="1000"
          hint="Only use a figure your lender has confirmed in writing."
        />
        <NumberField
          id="instalments"
          label="Number of payments"
          suffix="payments"
          value={instalments}
          onChange={setInstalments}
          error={errors.instalments}
          step="1"
          min={1}
          hint="Use 1 for a single lump-sum payment."
        />
      </form>

      <div aria-live="polite" className="space-y-6">
        {valid ? (
          <>
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
              <p className="text-sm font-bold tracking-widest text-sky-light uppercase">Difference from your balance</p>
              <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">{pkr(saving)}</p>
              <p className="mt-1 text-white/85">{pctSaved.toFixed(1)}% less than the outstanding balance</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
                <div>
                  <dt className="text-sm text-white/80">Offer as % of balance</dt>
                  <dd className="text-xl font-bold text-white">{pctOfBalance.toFixed(1)}%</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/80">{n === 1 ? "Single payment" : `Each of ${n} payments`}</dt>
                  <dd className="text-xl font-bold text-white">{pkr(o / n)}</dd>
                </div>
              </dl>
              <div className="mt-6" aria-hidden="true">
                <div className="flex h-3 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full bg-sky-light" style={{ width: `${Math.min(100, pctOfBalance)}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-sm text-white/85">
                  <span>You pay</span>
                  <span>Not paid</span>
                </div>
              </div>
            </div>

            <div className="card sm:p-6">
              <h2 className="text-lg font-extrabold">Before you accept any settlement</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink marker:text-sky">
                <li>Get the full terms in writing from the lender before you pay anything.</li>
                <li>Ask how the account will be reported. A settled loan may be shown as settled, not paid in full.</li>
                <li>Pay only through the lender&apos;s official channels and keep every receipt.</li>
                <li>After the last payment, request a clearance letter that refers to the settlement.</li>
              </ul>
            </div>
          </>
        ) : (
          <p className="card text-muted">Enter valid figures to see the comparison.</p>
        )}
      </div>
    </div>
  );
}
