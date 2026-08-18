import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "berbahasa.id — Belajar Bahasa Inggris Lewat Berita Harian",
  description:
    "Satu artikel berita bahasa Inggris setiap hari, level B1, lengkap dengan kosakata, latihan membaca, dan percakapan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">berbahasa.id</span>
              <span className="hidden text-xs text-slate-400 sm:inline">Daily English Learning</span>
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-6 text-xs text-slate-400 sm:px-6">
            berbahasa.id — belajar bahasa Inggris lewat ringkasan berita harian, level B1.
          </div>
        </footer>
      </body>
    </html>
  );
}
