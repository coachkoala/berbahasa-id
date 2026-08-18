"use client";

import { useAppState } from "@/lib/store";

export function BookmarkButton({ slug }: { slug: string }) {
  const { isBookmarked, toggleBookmark } = useAppState();
  const bookmarked = isBookmarked(slug);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      aria-pressed={bookmarked}
      aria-label="Simpan artikel"
      className="ml-auto flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border-2 border-[#111] bg-white"
    >
      <span style={{ color: bookmarked ? "#FFD100" : "#E5E5E5", WebkitTextStroke: "1px #111" }}>★</span>
    </button>
  );
}
