"use client";

import { useEffect } from "react";

export function PrintButton() {
  useEffect(() => {
    const timer = setTimeout(() => window.print(), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border-[2.5px] border-[#111] bg-[#FFD100] px-4 py-2 font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111] print:hidden"
    >
      🖨️ Print / Simpan sebagai PDF
    </button>
  );
}
