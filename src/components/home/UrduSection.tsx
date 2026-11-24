import { Noto_Nastaliq_Urdu } from "next/font/google";
import { Check } from "lucide-react";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";

// Nastaliq is the script most Urdu readers in Pakistan are used to. Loaded only where Urdu text appears.
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const message = "السلام علیکم SmartGuru، میں نے اپنا قرض ادا کر دیا ہے اور مجھے کلیئرنس لیٹر (NOC) چاہیے۔";

const services = [
  { title: "کلیئرنس لیٹر (NOC)", text: "قرض دینے والی کمپنی کا خط کہ آپ کے ذمے اب کوئی رقم باقی نہیں۔" },
  { title: "آپ کے کاغذات واپس", text: "گاڑی یا گھر کے کاغذات اور چیک جو ابھی تک بینک یا کمپنی کے پاس ہیں۔" },
  { title: "مستقبل کے لیے ثبوت", text: "ایک مکمل فائل جو دکھائے کہ آپ کا قرض بند ہو چکا ہے۔" },
];

const steps = [
  "واٹس ایپ پر ہمیں میسج کریں اور بتائیں کہ آپ نے کون سا بینک یا لون ایپ استعمال کیا۔",
  "اپنی ادائیگی کی رسیدیں یا آخری اسٹیٹمنٹ بھیجیں۔",
  "ہم آپ کو کلیئرنس لیٹر اور کاغذات مانگنے میں مدد دیتے ہیں۔",
];

const promises = ["پہلی بات چیت مفت", "ہم قرض نہیں دیتے", "ہم کبھی پاس ورڈ یا OTP نہیں مانگتے"];

/** The home page's main message in simple Urdu, with its own WhatsApp button. */
export function UrduSection() {
  return (
    <section
      id="urdu"
      lang="ur"
      dir="rtl"
      aria-labelledby="urdu-heading"
      className={`${urduFont.className} scroll-mt-24 border-y border-line bg-brand-mist py-14 sm:py-16`}
    >
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-base font-bold text-brand-ink">اردو میں پڑھیں</p>
          <h2 id="urdu-heading" className="text-2xl leading-[1.9] font-bold text-brand-dark sm:text-3xl">
            قرض ادا کر دیا؟ اب اپنا کلیئرنس لیٹر حاصل کریں
          </h2>
          <p className="mt-3 text-lg leading-[2.1] text-ink">
            بہت سے لوگ بینک یا لون ایپ کا قرض پورا ادا کر دیتے ہیں، لیکن انہیں یہ ثبوت نہیں ملتا کہ قرض ختم ہو گیا ہے۔
            ہم آپ کو کلیئرنس لیٹر (NOC) لینے اور اپنے کاغذات واپس لینے میں مدد دیتے ہیں۔
          </p>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.title} className="flex items-start gap-3">
                <span className="mt-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                </span>
                <p className="text-lg leading-[2.1] text-ink">
                  <strong className="text-brand-dark">{s.title}:</strong> {s.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
          <h3 className="text-xl leading-[1.9] font-bold text-brand-dark">کیسے شروع کریں؟</h3>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-ink font-sans text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <p className="text-lg leading-[2.1] text-ink">{s}</p>
              </li>
            ))}
          </ol>
          <WhatsAppCta
            message={message}
            label={<span className="leading-[2]">واٹس ایپ پر بات کریں</span>}
            newTabNote="(نئی ٹیب میں کھلے گا)"
            className="mt-6 sm:w-full"
          />
          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-bold text-brand-dark">
            {promises.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 leading-[2]">
                <Check size={15} strokeWidth={3} className="text-brand-ink" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-sm leading-[2] text-muted">
            ہم پیر سے ہفتہ، صبح 10 بجے سے شام 6 بجے تک جواب دیتے ہیں۔
          </p>
        </div>
      </div>
    </section>
  );
}
