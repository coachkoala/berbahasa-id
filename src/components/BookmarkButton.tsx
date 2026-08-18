"use client";

import { useAppState } from "@/lib/store";
import { StarIcon } from "@/components/StarIcon";

export function BookmarkButton({ slug }: { slug: string }) {
  const { isBookmarked, toggleBookmark } = useAppState();
  const bookmarked = isBookmarked(slug);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      aria-pressed={bookmarked}
      aria-label="Simpan artikel"
      className="ml-auto flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border-2 border-[#111] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
    >
      <StarIcon filled={bookmarked} />
    </button>
  );
}
