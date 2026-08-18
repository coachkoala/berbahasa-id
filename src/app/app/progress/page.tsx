import { getAllArticles, getAllVocabulary } from "@/lib/articles";
import { StreakStatCard } from "@/components/StreakStatCard";

export default function ProgressPage() {
  const articles = getAllArticles();
  const vocabulary = getAllVocabulary(articles);

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Progres</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">Pantau perkembangan belajarmu.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StreakStatCard />

        <div className="rounded-[18px] border-[3px] border-[#111] bg-white p-[18px]">
          <div className="text-[13px] font-semibold text-[#2B2B2B]">Artikel Dibaca</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] font-bold text-[#111]">
            {articles.length}
          </div>
        </div>

        <div className="rounded-[18px] border-[3px] border-[#111] bg-white p-[18px]">
          <div className="text-[13px] font-semibold text-[#2B2B2B]">Kata Dipelajari</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] font-bold text-[#111]">
            {vocabulary.length}
          </div>
        </div>
      </div>
    </div>
  );
}
