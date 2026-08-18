import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-md sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">{article.level}</span>
        <span>{formatDate(article.date)}</span>
        <span aria-hidden>·</span>
        <span>{article.readTimeMinutes} min baca</span>
        {article.isExample && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">Contoh</span>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700 sm:text-xl">
          {article.titleEn}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{article.titleId}</p>
      </div>

      <p className="line-clamp-2 text-sm text-slate-600">{article.newsParagraphs[0]}</p>

      <span className="mt-auto text-sm font-medium text-indigo-600 group-hover:underline">
        Baca artikel →
      </span>
    </Link>
  );
}
