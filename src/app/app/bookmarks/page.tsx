import { getAllArticles } from "@/lib/articles";
import { BookmarksList } from "@/components/BookmarksList";

export default function BookmarksPage() {
  const articles = getAllArticles();

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Tersimpan</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">Artikel yang kamu simpan untuk dibaca lagi.</p>
      </div>

      <BookmarksList articles={articles} />
    </div>
  );
}
