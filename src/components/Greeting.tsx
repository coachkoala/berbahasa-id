"use client";

import { useAppState } from "@/lib/store";

export function Greeting() {
  const { user } = useAppState();
  const name = user?.email?.split("@")[0] ?? "";

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">
        Selamat datang{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-1 text-sm text-[#2B2B2B]">Yuk belajar hal baru hari ini.</p>
    </div>
  );
}
