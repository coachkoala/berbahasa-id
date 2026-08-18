import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import { Greeting } from "@/components/Greeting";
import { DashboardSidebarWidgets } from "@/components/DashboardSidebarWidgets";

export default function DashboardPage() {
  const articles = getAllArticles();
  const topArticle = articles[0];
  const secondArticle = articles[1];

  return (
    <>
      <div className="flex min-w-[280px] flex-1 flex-col gap-5">
        <Greeting />

        {topArticle && (
          <Link
            href={`/app/articles/${topArticle.slug}`}
            className="flex flex-wrap gap-5 rounded-[20px] border-[3px] border-[#111] bg-white p-5 shadow-[6px_6px_0_#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
          >
            {topArticle.coverImage && (
              <div className="h-[130px] w-[180px] shrink-0 overflow-hidden rounded-[14px] border-[3px] border-[#111]">
                <Image
                  src={topArticle.coverImage.src}
                  alt={topArticle.coverImage.alt}
                  width={360}
                  height={260}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex min-w-[200px] flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border-2 border-[#111] bg-[#FFD100] px-2.5 py-[3px] font-[family-name:var(--font-display)] text-[11.5px] font-bold">
                  {topArticle.level}
                </span>
                <span className="text-xs text-[#2B2B2B]">{topArticle.readTimeMinutes} min baca</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[17px] font-bold leading-snug text-[#111]">
                {topArticle.titleEn}
              </h2>
              <p className="line-clamp-2 text-[13.5px] text-[#2B2B2B]">{topArticle.news[0]?.en}</p>
              <span className="mt-auto font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111]">
                Baca berita →
              </span>
            </div>
          </Link>
        )}

        {secondArticle && (
          <Link
            href={`/app/articles/${secondArticle.slug}`}
            className="flex items-center gap-4 rounded-[20px] border-[3px] border-[#111] bg-white p-5 shadow-[6px_6px_0_#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[2.5px] border-[#111] bg-[#FFD100] font-[family-name:var(--font-display)] text-sm font-bold">
              Aa
            </div>
            <div className="min-w-0">
              <div className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[#111]">
                Lanjutkan Belajar
              </div>
              <div className="mt-0.5 truncate text-[13px] text-[#2B2B2B]">{secondArticle.titleEn}</div>
            </div>
            <span className="ml-auto shrink-0 font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111]">
              Lanjut →
            </span>
          </Link>
        )}
      </div>

      <DashboardSidebarWidgets />
    </>
  );
}
