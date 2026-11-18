import { articles } from "@/lib/content";
import { appCategories, loanApps } from "@/lib/loan-apps";
import { contentUpdated } from "@/lib/seo";
import { shortDisclaimer, site, whatsappDisplay } from "@/lib/site";
import { tools } from "@/lib/tools";

// Plain-text summary of the site for answer engines and assistants (llmstxt.org format).
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const byCategory = appCategories
    .map((c) => `- ${c.label}: ${loanApps.filter((a) => a.category === c.id).map((a) => a.name).join(", ")}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.name} (${site.url.replace(/^https?:\/\//, "")}) is an independent loan clearance and loan settlement assistance service for individuals in Pakistan. It helps people confirm what they owe, communicate with their lender, and obtain a written clearance letter (NOC) and an accurate credit record. ${site.name} is not a bank, lender, credit bureau or law firm, does not give loans and does not collect loan repayments.

## Key facts
- Service area: Pakistan (consultations on WhatsApp and by email)
- Services: loan clearance assistance, clearance letter (NOC) follow-up, return of documents and lien removal guidance, loan settlement assistance
- Loans covered: bank loans, credit cards, car and home finance, and ${loanApps.length} digital lending apps
- First consultation: free, with no obligation; any paid help is agreed in writing first
- Payments: always made directly to the lender; ${site.name} never asks borrowers to pay a personal account
- No guarantees: lenders decide on any settlement, so no result, reduction or timeline is guaranteed
- Contact: WhatsApp ${whatsappDisplay}, email ${site.email}
- Last reviewed: ${contentUpdated}

## Main pages
- [Loan clearance assistance](${u("/loan-clearance")}): getting a clearance letter (NOC), documents and credit record updates after a loan is closed
- [Loan settlement assistance](${u("/loan-settlement")}): help when repayments have become unmanageable
- [Loan apps we cover](${u("/loan-apps")}): the ${loanApps.length} digital lending apps we provide clearance help for
- [How it works](${u("/how-it-works")}): the three-step process
- [FAQs](${u("/faqs")}): fees, confidentiality, credit records and more
- [Request a consultation](${u("/request-consultation")}): free, no-obligation form
- [Contact](${u("/contact")})

## Guides
${articles.map((a) => `- [${a.title}](${u(`/articles/${a.slug}`)}): ${a.quickAnswer ?? a.excerpt}`).join("\n")}

## Free tools
${tools.map((t) => `- [${t.title}](${u(`/tools/${t.slug}`)}): ${t.short}`).join("\n")}

## Loan apps covered
${byCategory}

${site.name} is not affiliated with, endorsed by or acting for any of these apps; names are used only to identify the loans it helps clear.

## Policies
- [Privacy Policy](${u("/privacy-policy")})
- [Terms & Conditions](${u("/terms-and-conditions")})
- [Disclaimer](${u("/disclaimer")})
- [Complaints Policy](${u("/complaints-policy")})

## Important
${shortDisclaimer}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
