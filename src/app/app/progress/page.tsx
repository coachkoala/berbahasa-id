import { getAllArticles, getAllVocabulary } from "@/lib/articles";

export default function ProgressPage() {
  const articles = getAllArticles();
  const vocabulary = getAllVocabulary(articles);

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Progres</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">Pantau perkembangan belajarmu.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[18px] border-[3px] border-[#111] bg-[#FFD100] p-[18px]">
          <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111]">
            Streak
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] font-bold text-[#111]">
            12 <span className="text-[15px] font-semibold">hari</span>
          </div>
        </div>

        <div className="rounded-[18px] border-[3px] border-[#111] bg-white p-[18px]">
          <div className="text-[13px] font-semibold text-[#2B2B2B]">Level</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-[#111]">
            B1 Intermediate
          </div>
          <div className="mt-2.5 h-[10px] overflow-hidden rounded-full border-2 border-[#111] bg-[#E5E5E5]">
            <div className="h-full w-[73%] bg-[#FFD100]" />
          </div>
          <div className="mt-1 text-xs text-[#2B2B2B]">73% ke level berikutnya</div>
        </div>

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
