"use client";

import { useState, type ReactNode } from "react";

export function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-[18px] border-[3px] border-[#111] bg-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border-b-[3px] border-[#111] bg-[#F7F5EF] px-[18px] py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span>{open ? "▾" : "▸"}</span>
      </button>

      {open && <div className="p-[18px]">{children}</div>}
    </div>
  );
}
