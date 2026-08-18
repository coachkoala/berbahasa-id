import type { VocabularyItem } from "@/lib/articles";

export function VocabularyList({ items }: { items: VocabularyItem[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div
          key={item.word}
          className={`py-3 ${index < items.length - 1 ? "border-b-2 border-[#E5E5E5]" : ""}`}
        >
          <div className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#111]">
            {item.word}
          </div>
          {item.phonetic && (
            <div className="mt-0.5 font-mono text-xs text-[#2B2B2B]">{item.phonetic}</div>
          )}
          <div className="mt-1 text-sm text-[#111]">{item.meaningId}</div>
          {item.exampleEn && (
            <div className="mt-1.5 border-l-[3px] border-[#FFD100] pl-2.5">
              <p className="text-[13px] text-[#2B2B2B]">{item.exampleEn}</p>
              <p className="text-xs italic text-[#8a8a8a]">{item.exampleId}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
