import type { UsefulExpression } from "@/lib/articles";

export function ExpressionsList({ expressions }: { expressions: UsefulExpression[] }) {
  return (
    <div className="flex flex-col gap-3">
      {expressions.map((expression) => (
        <div key={expression.phrase} className="rounded-[14px] border-[2.5px] border-[#111] p-3.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#111]">
              &ldquo;{expression.phrase}&rdquo;
            </span>
            {expression.phonetic && (
              <span className="font-mono text-[11.5px] text-[#6b6b6b]">{expression.phonetic}</span>
            )}
          </div>
          <p className="mt-1.5 text-[13.5px] text-[#111]">{expression.meaningId}</p>
          <p className="mt-1 text-[13px] text-[#2B2B2B]">{expression.definitionEn}</p>
          <div className="mt-2 border-t-2 border-[#E5E5E5] pt-2">
            <p className="text-[13px] text-[#2B2B2B]">{expression.exampleEn}</p>
            <p className="text-xs italic text-[#6b6b6b]">{expression.exampleId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
