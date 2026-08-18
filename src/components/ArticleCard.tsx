import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-md sm:flex-row sm:p-5"
    >
      {article.coverImage && (
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-40">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes="(min-width: 640px) 160px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{article.level}</span>
          <span>{formatDate(article.date)}</span>
          <span aria-hidden>·</span>
          <span>{article.readTimeMinutes} min baca</span>
          {article.isExample && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">Contoh</span>
          )}
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 sm:text-lg">
            {article.titleEn}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{article.titleId}</p>
        </div>

        <p className="line-clamp-2 text-sm text-slate-600">{article.news[0]?.en}</p>

        <span className="mt-auto text-sm font-medium text-emerald-600 group-hover:underline">
          Baca artikel →
        </span>
      </div>
    </Link>
  );
}
