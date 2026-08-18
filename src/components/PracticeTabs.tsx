"use client";

import { useState } from "react";
import type { Article } from "@/lib/articles";
import { PracticeReading } from "@/components/PracticeReading";

export function PracticeTabs({ articles }: { articles: Article[] }) {
  const [activeSlug, setActiveSlug] = useState(articles[0]?.slug);
  const activeArticle = articles.find((article) => article.slug === activeSlug) ?? articles[0];

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {articles.map((article) => (
          <button
            key={article.slug}
            type="button"
            onClick={() => setActiveSlug(article.slug)}
            className={`rounded-full border-[2.5px] border-[#111] px-4 py-2 font-[family-name:var(--font-display)] text-[13px] font-semibold ${
              article.slug === activeSlug ? "bg-[#FFD100] text-[#111]" : "bg-white text-[#111]"
            }`}
          >
            {article.titleEn}
          </button>
        ))}
      </div>

      {activeArticle && (
        <div className="max-w-2xl">
          <PracticeReading sentences={activeArticle.practice} />
        </div>
      )}
    </>
  );
}
