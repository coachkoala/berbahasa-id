import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { AppStateProvider } from "@/lib/store";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "berbahasa.id — Belajar Bahasa Inggris Lewat Berita",
  description:
    "Satu artikel berita bahasa Inggris setiap hari, level B1, lengkap dengan kosakata, dialog, dan kuis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F5EF] font-[family-name:var(--font-body)] text-[#111111] print:bg-white">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
