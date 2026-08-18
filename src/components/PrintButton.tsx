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
      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 print:hidden"
    >
      🖨️ Print / Simpan sebagai PDF
    </button>
  );
}
