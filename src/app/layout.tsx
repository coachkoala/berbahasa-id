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
    "Satu artikel berita bahasa Inggris setiap hari, level B1, lengkap dengan kosakata, flashcard, dialog, dan quiz.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-100 text-slate-900">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col bg-white shadow-sm">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
            <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
              ber<span className="text-emerald-600">bahasa.id</span>
            </Link>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-200 px-4 py-6 text-xs text-slate-400 sm:px-6">
            berbahasa.id — belajar bahasa Inggris lewat ringkasan berita harian.
          </footer>
        </div>
      </body>
    </html>
  );
}
