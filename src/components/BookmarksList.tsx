"use client";

import type { Article } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { useAppState } from "@/lib/store";

export function BookmarksList({ articles }: { articles: Article[] }) {
  const { bookmarks } = useAppState();
  const bookmarked = articles.filter((article) => bookmarks[article.slug]);

  if (bookmarked.length === 0) {
    return (
      <p className="rounded-[18px] border-[3px] border-dashed border-[#111] bg-white p-6 text-center text-sm text-[#2B2B2B]">
        Belum ada artikel tersimpan. Tap ikon ★ di artikel untuk menyimpannya di sini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {bookmarked.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
