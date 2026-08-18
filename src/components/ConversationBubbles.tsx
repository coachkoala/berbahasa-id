import type { ConversationLine } from "@/lib/articles";

export function ConversationBubbles({ lines }: { lines: ConversationLine[] }) {
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, index) => {
        const isB = line.speaker === "B";
        return (
          <div key={index} className={`flex ${isB ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                isB
                  ? "rounded-br-sm bg-emerald-600 text-white"
                  : "rounded-bl-sm bg-slate-100 text-slate-900"
              }`}
            >
              <div>{line.en}</div>
              <div className={`mt-1 text-xs italic ${isB ? "text-emerald-50/80" : "text-slate-500"}`}>
                {line.id}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
