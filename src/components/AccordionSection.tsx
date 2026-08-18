"use client";

import { useState, type ReactNode } from "react";

export function AccordionSection({
  icon,
  title,
  defaultOpen = true,
  children,
}: {
  icon: string;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
          <span aria-hidden>{icon}</span>
          {title}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-xs text-emerald-600 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {open && <div className="p-4 sm:p-5">{children}</div>}
    </section>
  );
}
