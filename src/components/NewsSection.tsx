import type { VocabularyItem } from "@/lib/articles";
import { HighlightedText } from "@/components/HighlightedText";

export function NewsSection({ paragraphs, vocabulary }: { paragraphs: string[]; vocabulary: VocabularyItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-base leading-relaxed text-slate-900 sm:text-[17px]">
          <HighlightedText text={paragraph} vocabulary={vocabulary} />
        </p>
      ))}
    </div>
  );
}
