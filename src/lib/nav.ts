import "server-only";
import { blogCategories, categoryPath } from "./blog";
import { helpNav, type NavItem } from "./site";
import { tools } from "./tools";

/** Full main menu, built on the server so blog data is not shipped to the browser. */
export function mainNav(): NavItem[] {
  return [
    {
      href: "/blog",
      label: "Blog",
      children: [
        { href: "/blog", label: "All Posts" },
        ...blogCategories.map((c) => ({ href: categoryPath(c.slug), label: c.label })),
      ],
    },
    {
      href: "/tools",
      label: "Free Tools",
      children: [{ href: "/tools", label: "All Tools" }, ...tools.map((t) => ({ href: `/tools/${t.slug}`, label: t.title }))],
    },
    { href: "/loan-apps", label: "Loan Apps" },
    helpNav,
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
}
