import type { UsefulExpression } from "@/lib/articles";

export function ExpressionsList({ expressions }: { expressions: UsefulExpression[] }) {
  return (
    <div className="flex flex-col gap-3">
      {expressions.map((expression) => (
        <div key={expression.phrase} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-slate-900">&ldquo;{expression.phrase}&rdquo;</span>
            {expression.phonetic && <span className="text-xs text-slate-400">{expression.phonetic}</span>}
          </div>
          <p className="mt-1 text-sm text-slate-600">{expression.meaningId}</p>
          <p className="mt-2 text-sm text-slate-500">{expression.definitionEn}</p>
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-sm text-slate-700">{expression.exampleEn}</p>
            <p className="text-xs text-slate-400">{expression.exampleId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
