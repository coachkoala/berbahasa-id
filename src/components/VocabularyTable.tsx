import type { VocabularyItem } from "@/lib/articles";

export function VocabularyTable({ items }: { items: VocabularyItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-medium">English</th>
            <th className="px-4 py-3 font-medium">Arti</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Contoh</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.word} className="align-top">
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-900">{item.word}</div>
                {item.phonetic && <div className="text-xs text-slate-400">{item.phonetic}</div>}
                <div className="mt-2 sm:hidden">
                  <p className="text-sm text-slate-700">{item.exampleEn}</p>
                  <p className="text-xs text-slate-400">{item.exampleId}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{item.meaningId}</td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <p className="text-sm text-slate-700">{item.exampleEn}</p>
                <p className="text-xs text-slate-400">{item.exampleId}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
