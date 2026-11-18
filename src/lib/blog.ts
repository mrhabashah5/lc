import { articles, type Article } from "./content";

// Blog structure: paths and categories in one place so every link stays consistent.

export const blogPath = (slug: string) => `/blog/${slug}`;
export const categoryPath = (slug: string) => `/blog/category/${slug}`;

export const categorySlug = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const categoryInfo: Record<string, { description: string; icon: "file" | "phone" | "shield" | "book" | "chart" | "car" }> = {
  Documents: {
    description: "Clearance letters (NOC), the documents you should collect, and proof that a loan is fully closed.",
    icon: "file",
  },
  "Loan Apps": {
    description: "Closing loan app loans properly, checking SECP approval and dealing with digital lenders.",
    icon: "phone",
  },
  "Your Rights": {
    description: "Your rights as a borrower in Pakistan, harassment, and where to complain.",
    icon: "shield",
  },
  Basics: {
    description: "Plain-language explanations of loan settlement, loan clearance and how they differ.",
    icon: "book",
  },
  Credit: {
    description: "Credit reports, eCIB and private credit bureaus, and keeping your record accurate.",
    icon: "chart",
  },
  "Auto Finance": {
    description: "Car loans, the bank's NOC and removing the bank's lien from your vehicle registration.",
    icon: "car",
  },
};

export type BlogCategory = {
  label: string;
  slug: string;
  description: string;
  icon: "file" | "phone" | "shield" | "book" | "chart" | "car";
  posts: Article[];
};

/** Categories in the order they first appear in the article list, with their posts. */
export const blogCategories: BlogCategory[] = (() => {
  const seen = new Map<string, BlogCategory>();
  for (const a of articles) {
    if (!seen.has(a.category)) {
      const info = categoryInfo[a.category] ?? { description: `${a.category} guides.`, icon: "book" as const };
      seen.set(a.category, { label: a.category, slug: categorySlug(a.category), ...info, posts: [] });
    }
    seen.get(a.category)!.posts.push(a);
  }
  return [...seen.values()];
})();

export const categoryFor = (a: Article) => blogCategories.find((c) => c.label === a.category)!;

/** Previous and next posts in the blog's display order. */
export function adjacentPosts(slug: string) {
  const i = articles.findIndex((a) => a.slug === slug);
  return { prev: i > 0 ? articles[i - 1] : undefined, next: i >= 0 && i < articles.length - 1 ? articles[i + 1] : undefined };
}
