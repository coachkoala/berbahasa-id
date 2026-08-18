import Link from "next/link";
import type { RelatedVocabularyEntry } from "@/lib/articles";

export function RelatedVocabulary({ entries }: { entries: RelatedVocabularyEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-slate-500">
        Kosakata berikut juga pernah muncul di artikel sebelumnya — buka lagi untuk mengulang.
      </p>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.word} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
              {entry.word}
            </span>
            <span className="text-slate-400">muncul di</span>
            {entry.articles.map((article, index) => (
              <span key={article.slug}>
                <Link href={`/articles/${article.slug}`} className="text-indigo-600 hover:underline">
                  {article.titleEn}
                </Link>
                {index < entry.articles.length - 1 && <span className="text-slate-400">, </span>}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
