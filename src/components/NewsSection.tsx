import type { NewsParagraph, VocabularyItem } from "@/lib/articles";
import { HighlightedText } from "@/components/HighlightedText";

export function NewsSection({ paragraphs, vocabulary }: { paragraphs: NewsParagraph[]; vocabulary: VocabularyItem[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      {paragraphs.map((paragraph, index) => (
        <div key={index}>
          <p className="text-[15.5px] leading-[1.7] text-[#111]">
            <HighlightedText text={paragraph.en} vocabulary={vocabulary} />
          </p>
          <p className="mt-1.5 text-[13.5px] italic leading-[1.6] text-[#6b6b6b]">{paragraph.id}</p>
        </div>
      ))}
    </div>
  );
}
