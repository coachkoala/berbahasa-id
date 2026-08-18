import { WordMark } from "@/components/Logo";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b-[3px] border-[#111] bg-white px-4 py-3.5 sm:px-8 print:hidden">
      <WordMark size={18} />
      <div className="flex items-center gap-3">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border-[2.5px] border-[#111] text-sm">
          🔍
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border-[2.5px] border-[#111] text-sm">
          🔔
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[2.5px] border-[#111] bg-[#FFD100] font-[family-name:var(--font-display)] text-sm font-bold text-[#111]">
          A
        </div>
      </div>
    </header>
  );
}
