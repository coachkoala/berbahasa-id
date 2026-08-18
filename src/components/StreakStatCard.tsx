"use client";

import { useAppState } from "@/lib/store";

export function StreakStatCard() {
  const { streak } = useAppState();

  return (
    <div className="rounded-[18px] border-[3px] border-[#111] bg-[#FFD100] p-[18px]">
      <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111]">
        Streak
      </div>
      <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] font-bold text-[#111]">
        {streak} <span className="text-[15px] font-semibold">hari</span>
      </div>
    </div>
  );
}
