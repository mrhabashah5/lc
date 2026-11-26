import type { Metadata } from "next";
import { BadgeCheck, Home, MessageCircle, PhoneCall, Smartphone, Users, Wallet } from "lucide-react";
import { Analytics } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { urduFont } from "@/components/UrduTitle";
import { whatsappLink } from "@/lib/site";

// Landing page for the work-from-home job ad. It is reached from the ad only,
// so it stays out of search results and the sitemap.
export const metadata: Metadata = {
  title: { absolute: "گھر بیٹھے نوکری – خواتین کے لیے | اپلائی کریں" },
  description: "خواتین کے لیے گھر بیٹھے ریموٹ جاب۔ ماہانہ تنخواہ 20,000 روپے۔ واٹس ایپ پر اپنا نام اور عمر بھیج کر اپلائی کریں۔",
  alternates: { canonical: "/apply" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "خواتین کے لیے گھر بیٹھے نوکری کا موقع",
    description: "ماہانہ تنخواہ 20,000 روپے۔ واٹس ایپ پر اپلائی کریں۔",
    url: "/apply",
    locale: "ur_PK",
  },
};

/** Typed into the applicant's WhatsApp box, so the first message already has name and age. */
const applyMessage = [
  "السلام علیکم! میں گھر بیٹھے نوکری کے لیے اپلائی کرنا چاہتی ہوں۔",
  "جاب انٹرویو شروع کرنے کے لیے میری معلومات:",
  "میرا نام: ",
  "میری عمر: ",
].join(String.fromCharCode(10));

const applyHref = whatsappLink(applyMessage);
const phoneDisplay = "0310 1990325";

const duties = [
  { icon: PhoneCall, text: "کسٹمرز کی کالز اٹینڈ کرنا" },
  { icon: MessageCircle, text: "واٹس ایپ میسجز کا جواب دینا" },
  { icon: Users, text: "کسٹمرز کو معلومات فراہم کرنا" },
];

const requirements = [
  "اچھی گفتگو کرنے کی صلاحیت",
  "موبائل اور واٹس ایپ استعمال کرنے کا تجربہ",
  "ذمہ داری اور خوش اخلاقی",
];

const steps = [
  "نیچے دیے گئے واٹس ایپ بٹن پر کلک کریں",
  "اپنا نام اور عمر لکھ کر میسج بھیجیں",
  "ہماری ٹیم آپ کا انٹرویو شروع کرے گی",
];

function ApplyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1a8d4a] px-6 py-4 text-xl font-bold text-white shadow-float transition-colors hover:bg-brand-dark focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-[0.99] ${className}`}
    >
      <WhatsAppIcon size={28} />
      <span>واٹس ایپ پر اپلائی کریں</span>
    </a>
  );
}

export default function ApplyPage() {
  return (
    <div lang="ur" dir="rtl" className={`${urduFont.className} flex min-h-full flex-1 flex-col bg-surface text-ink`}>
      <main className="flex-1 pb-28 sm:pb-12">
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-dark to-[#0e6a42] px-4 pt-8 pb-16 text-white sm:pt-14 sm:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm leading-loose">
              <Home size={16} aria-hidden="true" />
              گھر بیٹھے ریموٹ جاب
            </p>
            <h1 className="mt-5 text-[1.75rem] tracking-normal text-white leading-[2.1] font-bold sm:text-5xl sm:leading-[1.9]">
              خواتین کے لیے گھر بیٹھے نوکری کا موقع!
            </h1>
            <p className="mt-3 text-lg leading-[2.1] text-white/90 sm:text-xl">
              ہمیں ایک ذمہ دار اور خوش اخلاق خاتون کی ضرورت ہے۔
            </p>
          </div>
        </section>

        <div className="mx-auto -mt-12 max-w-2xl space-y-5 px-4 sm:-mt-16">
          {/* Salary + main call to action */}
          <section className="rounded-3xl bg-white p-6 text-center shadow-card sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
              <Wallet size={28} aria-hidden="true" />
            </div>
            <h2 className="mt-3 text-lg leading-loose tracking-normal text-muted">ماہانہ تنخواہ</h2>
            <p className="text-4xl leading-[1.8] font-bold text-brand-dark sm:text-5xl">
              <span dir="ltr">20,000</span> روپے
            </p>
            <ApplyButton className="mt-5" />
            <p className="mt-3 text-sm leading-loose text-muted">
              بٹن دبانے پر واٹس ایپ کھلے گا، بس اپنا نام اور عمر لکھ کر بھیج دیں۔
            </p>
          </section>

          {/* Duties */}
          <section className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl leading-[2] font-bold tracking-normal text-brand-dark">کام کی ذمہ داریاں</h2>
            <ul className="mt-3 space-y-3">
              {duties.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4 rounded-2xl bg-brand-mist p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-ink">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="text-lg leading-[2]">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl leading-[2] font-bold tracking-normal text-brand-dark">ضروری قابلیت</h2>
            <ul className="mt-3 space-y-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-center gap-3 text-lg leading-[2]">
                  <BadgeCheck size={24} className="shrink-0 text-brand" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line p-4 leading-[2] text-muted">
              <Smartphone size={22} className="shrink-0 text-brand-ink" aria-hidden="true" />
              صرف ایک موبائل اور واٹس ایپ کی ضرورت ہے، دفتر جانے کی ضرورت نہیں۔
            </div>
          </section>

          {/* How to apply */}
          <section className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl leading-[2] font-bold tracking-normal text-brand-dark">اپلائی کرنے کا طریقہ</h2>
            <ol className="mt-3 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark font-sans text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-lg leading-[2]">{s}</span>
                </li>
              ))}
            </ol>
            <ApplyButton className="mt-6" />
            <p className="mt-4 text-center leading-loose text-muted">
              واٹس ایپ نمبر:{" "}
              <a href={applyHref} target="_blank" rel="noopener noreferrer" dir="ltr" className="font-sans font-bold text-brand-ink underline underline-offset-4">
                {phoneDisplay}
              </a>
            </p>
          </section>

          <p className="pb-4 text-center text-base leading-loose text-muted">صرف دلچسپی رکھنے والی خواتین رابطہ کریں۔</p>
        </div>
      </main>

      {/* Always-visible button on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <ApplyButton />
      </div>

      <Analytics />
    </div>
  );
}
