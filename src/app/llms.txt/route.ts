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

> ${site.name} (${site.url.replace(/^https?:\/\//, "")}) is an independent loan clearance assistance service for individuals in Pakistan. It helps people who have paid off a loan obtain a written clearance letter (NOC) and the return of their documents. It does not negotiate settlements, reduce debts or arrange repayment plans. ${site.name} is not a bank, lender, credit bureau or law firm, does not give loans and does not collect loan repayments.

## Key facts
- Service area: Pakistan (consultations on WhatsApp and by email)
- Services: loan clearance assistance, clearance letter (NOC) follow-up, return of documents and lien removal guidance, help closing loan app loans
- Loans covered: bank loans, credit cards, car and home finance, and ${loanApps.length} digital lending apps
- First consultation: free, with no obligation
- Payments: always made directly to the lender; ${site.name} never asks borrowers to pay a personal account
- No guarantees: lenders issue clearance letters on their own timelines, so no result or timeline is guaranteed
- Contact: WhatsApp ${whatsappDisplay}, email ${site.email}
- Last reviewed: ${contentUpdated}

## Main pages
- [Blog](${u("/blog")}): plain-language guides on loan clearance, loan apps, credit records and borrower rights in Pakistan
- [Loan clearance assistance](${u("/loan-clearance")}): getting a clearance letter (NOC) and documents back after a loan is paid off
- [Loan apps we cover](${u("/loan-apps")}): the ${loanApps.length} digital lending apps we provide clearance help for
- [How it works](${u("/how-it-works")}): the three-step process
- [FAQs](${u("/faqs")}): consultations, confidentiality, clearance letters and more
- [Request a consultation](${u("/request-consultation")}): free, no-obligation form
- [Contact](${u("/contact")})

## Blog guides
${articles.map((a) => `- [${a.title}](${u(`/blog/${a.slug}`)}): ${a.quickAnswer ?? a.excerpt}`).join("\n")}

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
