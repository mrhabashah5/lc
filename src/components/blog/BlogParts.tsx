import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { blogCategories, blogPath, categoryFor, categoryPath } from "@/lib/blog";
import { readMinutes, type Article } from "@/lib/content";
import { thumbnailFor } from "@/lib/images";
import { CategoryIcon } from "./CategoryIcon";

export const postDate = (iso?: string) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso))
    : "";

/** Category, date and reading time line used on cards and posts. */
export function PostMeta({ post, linkCategory = true }: { post: Article; linkCategory?: boolean }) {
  const cat = categoryFor(post);
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      {linkCategory ? (
        <Link href={categoryPath(cat.slug)} className="relative z-10 font-bold text-brand-ink hover:underline">
          {cat.label}
        </Link>
      ) : (
        <span className="font-bold text-brand-ink">{cat.label}</span>
      )}
      {post.updated && (
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={14} aria-hidden="true" />
          <time dateTime={post.updated}>{postDate(post.updated)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Clock size={14} aria-hidden="true" /> {readMinutes(post)} min read
      </span>
    </p>
  );
}

/** Large featured post card. */
export function FeaturedPost({ post, priority = false }: { post: Article; priority?: boolean }) {
  const thumb = thumbnailFor(post.slug);
  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow hover:shadow-float md:grid-cols-2">
      {thumb && (
        <Image src={thumb} alt="" width={640} height={360} unoptimized priority={priority} className="aspect-video h-full w-full bg-brand-soft object-cover" />
      )}
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="mb-2 text-xs font-bold tracking-widest text-orange-ink uppercase">Featured guide</p>
        <h2 className="text-2xl leading-snug font-extrabold sm:text-3xl">
          <Link href={blogPath(post.slug)} className="after:absolute after:inset-0 group-hover:text-brand-ink">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-4">
          <PostMeta post={post} />
        </div>
        <span className="link-arrow mt-5" aria-hidden="true">
          Read the guide <ArrowRight size={17} />
        </span>
      </div>
    </article>
  );
}

/** Compact list item for sidebars and "latest" lists. */
export function PostListItem({ post }: { post: Article }) {
  const thumb = thumbnailFor(post.slug);
  return (
    <li className="group relative flex gap-4">
      {thumb && (
        <Image src={thumb} alt="" width={112} height={63} unoptimized className="aspect-video h-auto w-28 shrink-0 rounded-lg bg-brand-soft object-cover" />
      )}
      <div className="min-w-0">
        <h3 className="text-[15px] leading-snug font-bold">
          <Link href={blogPath(post.slug)} className="after:absolute after:inset-0 group-hover:text-brand-ink">
            {post.seoTitle ?? post.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{readMinutes(post)} min read</p>
      </div>
    </li>
  );
}

/** Row of category links ("pills"); highlights the current category. */
export function CategoryPills({ current }: { current?: string }) {
  const base = "inline-flex items-center whitespace-nowrap gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors";
  const on = "border-brand-dark bg-brand-dark text-white";
  const off = "border-field bg-white text-brand-dark hover:border-brand-ink hover:text-brand-ink";
  return (
    <nav aria-label="Blog categories" className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
      <ul className="flex gap-2 sm:flex-wrap">
        <li className="shrink-0">
          <Link href="/blog" aria-current={!current ? "page" : undefined} className={`${base} ${!current ? on : off}`}>
            All posts
          </Link>
        </li>
        {blogCategories.map((c) => (
          <li key={c.slug} className="shrink-0">
            <Link
              href={categoryPath(c.slug)}
              aria-current={current === c.slug ? "page" : undefined}
              className={`${base} ${current === c.slug ? on : off}`}
            >
              <CategoryIcon icon={c.icon} size={16} />
              {c.label}
              <span className={`rounded-full px-1.5 text-xs ${current === c.slug ? "bg-white/20" : "bg-brand-soft text-brand-ink"}`}>
                {c.posts.length}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Grid of category tiles for the blog and home pages. */
export function CategoryTiles() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {blogCategories.map((c) => (
        <li key={c.slug} className="group relative rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-float sm:p-6">
          <span className="icon-tile">
            <CategoryIcon icon={c.icon} size={24} />
          </span>
          <h3 className="mt-4 text-lg font-bold">
            <Link href={categoryPath(c.slug)} className="after:absolute after:inset-0 group-hover:text-brand-ink">
              {c.label}
            </Link>
          </h3>
          <p className="mt-1 hidden text-sm leading-relaxed text-muted sm:block">{c.description}</p>
          <p className="mt-2 text-sm font-semibold text-brand-ink">
            {c.posts.length} {c.posts.length === 1 ? "guide" : "guides"}
          </p>
        </li>
      ))}
    </ul>
  );
}
