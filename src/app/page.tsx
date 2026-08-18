import Link from "next/link";
import { Logo, WordMark } from "@/components/Logo";

const FEATURES = [
  { icon: "▤", title: "Berita Terkini", desc: "Dari berbagai sumber terpercaya." },
  { icon: "Aa", title: "Belajar Bahasa", desc: "Vocabulary, grammar, dan ekspresi." },
  { icon: "☰", title: "Praktik Langsung", desc: "Latihan interaktif untuk pemahaman lebih dalam." },
  { icon: "↗", title: "Tingkatkan Diri", desc: "Pantau progres dan capai tujuanmu." },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F7F5EF" }}>
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <WordMark size={22} />
        </div>
        <Link
          href="/app"
          className="rounded-full border-[3px] border-[#111] bg-[#FFD100] px-6 py-2.5 font-[family-name:var(--font-display)] text-[15px] font-bold text-[#111] shadow-[4px_4px_0_#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
        >
          Masuk ke Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-[1000px] px-8 pb-5 pt-10">
        <div className="flex flex-col items-center gap-6 rounded-[28px] border-[3px] border-[#111] bg-white p-10 text-center shadow-[10px_10px_0_#111] sm:p-12">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Logo size="lg" />
            <div className="text-center sm:text-left">
              <h1 className="font-[family-name:var(--font-display)] text-[44px] font-bold leading-none text-[#111]">
                berbahasa<span className="text-[#FFD100]">.</span>id
              </h1>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[13px] font-semibold uppercase tracking-[0.08em] text-[#2B2B2B]">
                Belajar Bahasa Inggris Lewat Berita
              </p>
            </div>
          </div>

          <p className="max-w-[520px] text-base leading-relaxed text-[#2B2B2B]">
            Satu ringkasan berita bahasa Inggris setiap hari, level B1, lengkap dengan kosakata, dialog,
            dan kuis. Belajar dari berita yang nyata, bukan buku teks.
          </p>

          <Link
            href="/app"
            className="rounded-full border-[3px] border-[#111] bg-[#111] px-8 py-3.5 font-[family-name:var(--font-display)] text-base font-bold text-white shadow-[5px_5px_0_#FFD100] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD100] focus-visible:ring-offset-2"
          >
            Mulai Belajar Gratis
          </Link>

          <div className="mt-2 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border-[3px] border-[#111] bg-[#F7F5EF] p-4 text-left"
              >
                <div className="mb-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[2.5px] border-[#111] bg-[#FFD100] text-[15px]">
                  {feature.icon}
                </div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[#111]">
                  {feature.title}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-[#2B2B2B]">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5 rounded-[20px] border-[3px] border-[#111] bg-[#111] px-6 py-4">
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#FFD100] text-xs">
            ♥
          </span>
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
            Berita nyata. Bahasa bermakna. Anda berkembang.
          </span>
        </div>
      </main>
    </div>
  );
}
