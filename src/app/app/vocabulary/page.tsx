import { getAllArticles, getAllVocabulary } from "@/lib/articles";

export default function VocabularyPage() {
  const articles = getAllArticles();
  const vocabulary = getAllVocabulary(articles);

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Kosakata</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">{vocabulary.length} kata yang telah kamu temui dari berita.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vocabulary.map((item) => (
          <div key={item.word} className="rounded-2xl border-[3px] border-[#111] bg-white p-4">
            <div className="font-[family-name:var(--font-display)] text-[16px] font-bold text-[#111]">
              {item.word}
            </div>
            {item.phonetic && <div className="mt-0.5 font-mono text-xs text-[#2B2B2B]">{item.phonetic}</div>}
            <div className="mt-1.5 text-[13.5px] text-[#111]">{item.meaningId}</div>
            <div className="mt-2.5 border-t-2 border-[#E5E5E5] pt-2.5">
              <p className="text-[13px] text-[#2B2B2B]">{item.exampleEn}</p>
              <p className="mt-0.5 text-xs italic text-[#6b6b6b]">{item.exampleId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
