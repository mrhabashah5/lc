import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Car, FileCheck, LineChart, ShieldAlert, Smartphone } from "lucide-react";
import { readMinutes, type Article } from "@/lib/content";
import { thumbnailFor } from "@/lib/images";

const art = {
  Basics: BookOpen,
  Documents: FileCheck,
  Credit: LineChart,
  "Loan Apps": Smartphone,
  "Your Rights": ShieldAlert,
  "Auto Finance": Car,
} as const;

export function ArticleCard({
  article,
  headingLevel = 3,
  priority = false,
}: {
  article: Article;
  headingLevel?: 2 | 3;
  /** Load the thumbnail immediately (use for the first visible card). */
  priority?: boolean;
}) {
  const Art = art[article.category as keyof typeof art] ?? BookOpen;
  const H = headingLevel === 2 ? "h2" : "h3";
  const thumb = thumbnailFor(article.slug);
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-float">
      {thumb ? (
        <Image
          src={thumb}
          alt=""
          width={640}
          height={360}
          unoptimized
          priority={priority}
          className="aspect-video w-full bg-sky-light object-cover"
        />
      ) : (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-sky-light" aria-hidden="true">
          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-navy shadow-card">
            <Art size={30} />
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-sm font-bold tracking-widest text-sky-ink uppercase">
          {article.category} · {readMinutes(article)} min read
        </p>
        <H className="text-xl leading-snug font-bold">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-sky-ink">
            {article.title}
          </Link>
        </H>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{article.excerpt}</p>
        <span className="link-arrow mt-5" aria-hidden="true">
          Read article <ArrowRight size={17} />
        </span>
      </div>
    </article>
  );
}
