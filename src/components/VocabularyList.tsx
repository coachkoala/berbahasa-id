import type { VocabularyItem } from "@/lib/articles";

export function VocabularyList({ items }: { items: VocabularyItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-slate-100">
      {items.map((item) => (
        <div key={item.word} className="py-3 first:pt-0 last:pb-0">
          <div className="text-sm font-semibold text-emerald-700">{item.word}</div>
          {item.phonetic && <div className="mt-0.5 font-mono text-xs text-slate-500">{item.phonetic}</div>}
          <div className="mt-0.5 text-sm text-slate-700">{item.meaningId}</div>
        </div>
      ))}
    </div>
  );
}
