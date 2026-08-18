import type { VocabularyItem } from "@/lib/articles";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightedText({ text, vocabulary }: { text: string; vocabulary: VocabularyItem[] }) {
  if (vocabulary.length === 0) return <>{text}</>;

  const wordSet = new Set(vocabulary.map((item) => item.word.toLowerCase()));
  const words = [...vocabulary]
    .map((item) => item.word)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  const pattern = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        wordSet.has(part.toLowerCase()) ? (
          <strong key={index} className="font-semibold text-emerald-700">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
