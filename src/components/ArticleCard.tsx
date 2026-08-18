"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { useAppState } from "@/lib/store";

export function ArticleCard({ article }: { article: Article }) {
  const { isBookmarked, toggleBookmark } = useAppState();
  const bookmarked = isBookmarked(article.slug);

  return (
    <Link
      href={`/app/articles/${article.slug}`}
      className="relative flex flex-col gap-2.5 rounded-[20px] border-[3px] border-[#111] bg-white p-4 shadow-[6px_6px_0_#111]"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBookmark(article.slug);
        }}
        className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-[9px] border-2 border-[#111] bg-white"
        aria-pressed={bookmarked}
        aria-label="Simpan artikel"
      >
        <span style={{ color: bookmarked ? "#FFD100" : "#E5E5E5", WebkitTextStroke: "1px #111" }}>★</span>
      </button>

      {article.coverImage && (
        <div className="h-[130px] w-full overflow-hidden rounded-[14px] border-[3px] border-[#111]">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            width={400}
            height={260}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border-2 border-[#111] bg-[#FFD100] px-2.5 py-[3px] font-[family-name:var(--font-display)] text-[11px] font-bold">
          {article.level}
        </span>
        <span className="text-[11.5px] text-[#2B2B2B]">{formatDate(article.date)}</span>
        <span className="text-[11.5px] text-[#2B2B2B]">· {article.readTimeMinutes} min</span>
      </div>

      <h2 className="font-[family-name:var(--font-display)] text-base font-bold leading-tight text-[#111]">
        {article.titleEn}
      </h2>
      <p className="text-[13px] italic text-[#2B2B2B]">{article.titleId}</p>

      <span className="mt-0.5 font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111]">
        Baca artikel →
      </span>
    </Link>
  );
}
