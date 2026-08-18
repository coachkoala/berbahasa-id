import { getAllArticles } from "@/lib/articles";
import { PracticeTabs } from "@/components/PracticeTabs";

export default function PracticePage() {
  const articles = getAllArticles();

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Latihan</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">
          Baca bahasa Inggris dulu, coba pahami sebelum lihat terjemahan.
        </p>
      </div>

      <PracticeTabs articles={articles} />
    </div>
  );
}
