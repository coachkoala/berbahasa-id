import type { ConversationLine } from "@/lib/articles";

export function ConversationBubbles({ lines }: { lines: ConversationLine[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {lines.map((line, index) => {
        const isB = line.speaker === "B";
        return (
          <div key={index} className={`flex ${isB ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] border-[3px] border-[#111] px-[15px] py-[11px] ${
                isB ? "rounded-[16px_16px_4px_16px] bg-[#FFD100]" : "rounded-[16px_16px_16px_4px] bg-[#F7F5EF]"
              }`}
            >
              <div className="text-[14.5px] leading-[1.5] text-[#111]">{line.en}</div>
              <div className="mt-1 text-xs italic text-[#2B2B2B]">{line.id}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
