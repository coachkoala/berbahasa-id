"use client";

import { useAppState } from "@/lib/store";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className="relative h-7 w-[50px] rounded-full border-[2.5px] border-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      style={{ background: checked ? "#FFD100" : "#E5E5E5" }}
    >
      <span
        className="absolute top-0.5 h-[19px] w-[19px] rounded-full border-2 border-[#111] bg-white transition-all"
        style={{ left: checked ? 24 : 2 }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user, settings, toggleSetting, signOut } = useAppState();
  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-5">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Pengaturan</h1>

      <div className="rounded-[18px] border-[3px] border-[#111] bg-white p-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#111] bg-[#FFD100] font-[family-name:var(--font-display)] text-xl font-bold">
            {initial}
          </div>
          <div>
            <div className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#111]">
              Akun
            </div>
            <div className="text-[13px] text-[#2B2B2B]">{user?.email ?? "..."}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[18px] border-[3px] border-[#111] bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111]">Notifikasi Email</span>
          <Toggle checked={settings.emailNotif} onChange={() => toggleSetting("emailNotif")} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111]">Pengingat Harian</span>
          <Toggle checked={settings.dailyReminder} onChange={() => toggleSetting("dailyReminder")} />
        </div>
      </div>

      <button
        type="button"
        onClick={signOut}
        className="w-fit rounded-full border-[3px] border-[#111] bg-white px-[22px] py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      >
        Keluar
      </button>
    </div>
  );
}
