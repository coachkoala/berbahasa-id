import type { ConversationLine } from "@/lib/articles";

export function ConversationBlock({ lines }: { lines: ConversationLine[] }) {
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, index) => (
        <div key={index} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            {line.speaker}
          </span>
          <div>
            <p className="text-sm font-medium leading-relaxed text-slate-900 sm:text-base">{line.en}</p>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">{line.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
