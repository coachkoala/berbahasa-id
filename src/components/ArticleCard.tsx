"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { useAppState } from "@/lib/store";
import { StarIcon } from "@/components/StarIcon";

export function ArticleCard({ article }: { article: Article }) {
  const { isBookmarked, toggleBookmark } = useAppState();
  const bookmarked = isBookmarked(article.slug);

  return (
    <div className="relative flex flex-col gap-2.5 rounded-[20px] border-[3px] border-[#111] bg-white p-4 shadow-[6px_6px_0_#111]">
      <Link
        href={`/app/articles/${article.slug}`}
        className="absolute inset-0 z-0 rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      >
        <span className="sr-only">Baca artikel: {article.titleEn}</span>
      </Link>

      <button
        type="button"
        onClick={() => toggleBookmark(article.slug)}
        className="relative z-10 ml-auto flex h-8 w-8 items-center justify-center self-end rounded-[9px] border-2 border-[#111] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
        aria-pressed={bookmarked}
        aria-label="Simpan artikel"
        style={{ position: "absolute", right: 14, top: 14 }}
      >
        <StarIcon filled={bookmarked} />
      </button>

      {article.coverImage && (
        <div className="pointer-events-none h-[130px] w-full overflow-hidden rounded-[14px] border-[3px] border-[#111]">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            width={400}
            height={260}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="pointer-events-none flex flex-wrap items-center gap-2">
        <span className="rounded-full border-2 border-[#111] bg-[#FFD100] px-2.5 py-[3px] font-[family-name:var(--font-display)] text-[11px] font-bold">
          {article.level}
        </span>
        <span className="text-[11.5px] text-[#2B2B2B]">{formatDate(article.date)}</span>
        <span className="text-[11.5px] text-[#2B2B2B]">· {article.readTimeMinutes} min</span>
      </div>

      <h2 className="pointer-events-none font-[family-name:var(--font-display)] text-base font-bold leading-tight text-[#111]">
        {article.titleEn}
      </h2>
      <p className="pointer-events-none text-[13px] italic text-[#2B2B2B]">{article.titleId}</p>

      <span className="pointer-events-none mt-0.5 font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111]">
        Baca artikel →
      </span>
    </div>
  );
}
