import { gaId } from "./analytics";
import { site, whatsappDisplay } from "./site";

// DRAFT legal content. Have these pages reviewed by a qualified Pakistani
// lawyer and completed with the registered business details before launch.

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

const updated = "16 November 2026";
const contactLine = `You can contact us by email at ${site.email} or on WhatsApp at ${whatsappDisplay}.`;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How ByeByeLoan collects, uses, stores and protects your personal information.",
    updated,
    intro:
      "This Privacy Policy explains what personal information ByeByeLoan collects, why we collect it and how we handle it. By using this website or submitting a form, you agree to the practices described here.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: ["We collect only the information we need to respond to you and assist with your matter:"],
        bullets: [
          "Contact details you provide: name, phone number, email address and city",
          "Loan details you provide: type of loan, lender name, approximate amount, current status and any message you write",
          "Documents you choose to share with us after a consultation begins",
          "Basic technical information needed to run the website securely, such as your IP address at the time of a form submission",
          ...(gaId
            ? ["Website usage statistics collected through Google Analytics, such as pages viewed and the device type you used"]
            : []),
        ],
      },
      {
        heading: "Information we do not ask for",
        paragraphs: [
          "We will never ask you for a PIN, password, one-time password (OTP), CVV or full card number. Please do not send these to us or to anyone claiming to represent ByeByeLoan.",
        ],
      },
      {
        heading: "How we use your information",
        bullets: [
          "To respond to your consultation request or enquiry",
          "To assess your situation and provide the assistance you ask for",
          "To communicate with your lender on your behalf, only with your written authorisation",
          "To keep records of our dealings with you and to meet legal obligations",
          "To protect the website against misuse",
        ],
      },
      {
        heading: "Sharing your information",
        paragraphs: [
          "We do not sell or rent your personal information. We share it only:",
        ],
        bullets: [
          "With your lender, where you have authorised us in writing to do so",
          "With service providers who help us operate, such as email and hosting providers, under appropriate confidentiality obligations",
          "Where we are required to do so by law or by a competent authority",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry information for as long as needed to respond to you and, if you become a client, for as long as needed to provide our assistance and to meet legal and record-keeping requirements. You may ask us to delete your enquiry at any time.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect your information, including restricted access to submitted forms. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You may ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it, subject to any legal obligation we have to retain it.",
        ],
      },
      {
        heading: "WhatsApp and third-party services",
        paragraphs: [
          "If you contact us through WhatsApp, email or other third-party services, your messages are also subject to that provider's own terms and privacy policy.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
          contactLine,
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "The terms that apply to your use of the ByeByeLoan website.",
    updated,
    intro:
      "These Terms & Conditions govern your use of the ByeByeLoan website. By using the website, you accept them. If you do not agree, please do not use the website.",
    sections: [
      {
        heading: "About our service",
        paragraphs: [
          "ByeByeLoan provides information and assistance to individuals in Pakistan in relation to loan settlement and loan clearance. ByeByeLoan is not a bank, a financial institution, a lender, a debt collector, a credit bureau or a law firm.",
        ],
      },
      {
        heading: "Website information",
        paragraphs: [
          "The content on this website is general information only. It is not legal, financial, tax or credit advice and should not be relied on as such. You should consider your own circumstances and, where appropriate, obtain independent professional advice.",
        ],
      },
      {
        heading: "Consultation requests",
        paragraphs: [
          "Submitting a consultation request does not create a client relationship and does not oblige you or ByeByeLoan to proceed. Any engagement is subject to a separate written agreement setting out the scope of assistance and the applicable fee.",
        ],
      },
      {
        heading: "No guarantee of outcome",
        paragraphs: [
          "Decisions about settlements, restructuring, clearance letters and credit reporting are made by lenders and other third parties. ByeByeLoan does not guarantee any outcome, reduction, approval or timeline.",
        ],
      },
      {
        heading: "Your responsibilities",
        bullets: [
          "Provide information that is accurate and complete",
          "Do not submit information about another person without their permission",
          "Do not misuse the website, attempt to gain unauthorised access or interfere with its operation",
          "Make any loan payments directly to your lender through its official channels",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The ByeByeLoan name, logo, text and design of this website belong to ByeByeLoan. You may view and print pages for your personal use but may not reproduce them for commercial purposes without our written permission.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, ByeByeLoan is not liable for any loss arising from reliance on the general information on this website, from the website being unavailable, or from the decisions of lenders or other third parties.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Pakistan, and the courts of Pakistan have jurisdiction over any dispute relating to them.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: ["We may revise these terms from time to time by updating this page.", contactLine],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Important information about the nature and limits of ByeByeLoan's service.",
    updated,
    intro:
      "Please read this disclaimer carefully. It explains what ByeByeLoan is, what it is not, and the limits of what we can do.",
    sections: [
      {
        heading: "We are not a lender or a law firm",
        paragraphs: [
          "ByeByeLoan is an independent assistance service. We are not a bank, financial institution, lender, debt collector, credit bureau or law firm. We do not provide loans, we do not accept deposits and we do not collect repayments on behalf of any lender.",
        ],
      },
      {
        heading: "No guaranteed results",
        paragraphs: [
          "Whether a lender agrees to a settlement, restructuring or any other arrangement, and how quickly it issues a clearance letter or updates a credit record, is entirely the lender's decision. ByeByeLoan does not and cannot guarantee any specific result, reduction, saving or timeframe. Examples and descriptions on this website are illustrative only.",
        ],
      },
      {
        heading: "Not legal or financial advice",
        paragraphs: [
          "Information on this website is general in nature and is not legal, financial, tax or credit advice. If your matter involves court proceedings or legal notices, you should consult a qualified lawyer.",
        ],
      },
      {
        heading: "Effect on your credit record",
        paragraphs: [
          "A loan settlement may be reported on your credit record differently from a loan repaid in full and may affect your ability to obtain credit in future. ByeByeLoan cannot remove or alter accurate information held by lenders or credit bureaus.",
        ],
      },
      {
        heading: "Continue to meet your obligations",
        paragraphs: [
          "Nothing on this website is a recommendation to stop making payments to your lender. Missing payments may result in additional charges, recovery action and damage to your credit record.",
        ],
      },
      {
        heading: "Protect yourself",
        paragraphs: [
          "ByeByeLoan will never ask for your PIN, password, OTP or full card number. Always pay your lender directly through its official channels and keep your receipts.",
        ],
      },
    ],
  },
  {
    slug: "complaints-policy",
    title: "Complaints Policy",
    description: "How to make a complaint about ByeByeLoan and how we will handle it.",
    updated,
    intro:
      "We want to put things right if our service has fallen short. This policy explains how to raise a complaint and what you can expect from us.",
    sections: [
      {
        heading: "How to make a complaint",
        paragraphs: [
          `You can make a complaint by email at ${site.email}, on WhatsApp at ${whatsappDisplay}, or through the contact form on this website. Please include your name, contact details, your consultation reference if you have one, and a description of what went wrong and how you would like it resolved.`,
        ],
      },
      {
        heading: "What happens next",
        bullets: [
          "We will acknowledge your complaint within 3 working days",
          "A person who was not directly involved in the matter will review it",
          "We aim to send you a full written response within 15 working days",
          "If we need more time, we will tell you why and when you can expect a response",
        ],
      },
      {
        heading: "If you remain dissatisfied",
        paragraphs: [
          "If you are not satisfied with our response, you may ask for it to be reviewed by senior management. This does not affect any right you have to pursue the matter through the appropriate forum under the laws of Pakistan.",
        ],
      },
      {
        heading: "Complaints about your lender",
        paragraphs: [
          "This policy covers complaints about ByeByeLoan's own service. If your complaint is about a bank or other lender, it should be raised with that institution through its complaint procedure. We can explain the official escalation channels that are available.",
        ],
      },
      {
        heading: "Confidentiality",
        paragraphs: [
          "Complaints are handled confidentially, and making a complaint will not affect the way we treat you.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "How the ByeByeLoan website uses cookies.",
    updated,
    intro:
      "Cookies are small text files stored on your device by a website. This page explains how ByeByeLoan uses them.",
    sections: [
      {
        heading: "Cookies we use",
        paragraphs: [
          gaId
            ? "We use Google Analytics cookies to understand how visitors use the website, for example which pages are viewed and how many people contact us, so we can improve it. These cookies do not identify you by name. You can block them in your browser settings."
            : "The public ByeByeLoan website does not set advertising or tracking cookies.",
          "A single strictly necessary cookie is used only when a member of our staff signs in to the administration area. It keeps that session secure and is not used to track visitors.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "If you follow a link to a third-party service, such as WhatsApp, that service may set its own cookies under its own policies. We do not control those cookies.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can block or delete cookies through your browser settings. The public pages of this website will continue to work without cookies.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If we introduce analytics or other non-essential cookies in future, we will update this page and ask for your consent where required.",
          contactLine,
        ],
      },
    ],
  },
];
