import type { NewsParagraph, VocabularyItem } from "@/lib/articles";
import { HighlightedText } from "@/components/HighlightedText";

export function NewsSection({ paragraphs, vocabulary }: { paragraphs: NewsParagraph[]; vocabulary: VocabularyItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <div key={index}>
          <p className="text-base leading-relaxed text-slate-900 sm:text-[17px]">
            <HighlightedText text={paragraph.en} vocabulary={vocabulary} />
          </p>
          <p className="mt-1 text-sm italic leading-relaxed text-slate-400">{paragraph.id}</p>
        </div>
      ))}
    </div>
  );
}
