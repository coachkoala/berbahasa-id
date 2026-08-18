import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";

export default function DashboardPage() {
  const articles = getAllArticles();
  const topArticle = articles[0];
  const secondArticle = articles[1];

  return (
    <>
      <div className="flex min-w-[280px] flex-1 flex-col gap-5">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">
            Selamat pagi, Alex
          </h1>
          <p className="mt-1 text-sm text-[#2B2B2B]">Yuk belajar hal baru hari ini.</p>
        </div>

        {topArticle && (
          <Link
            href={`/app/articles/${topArticle.slug}`}
            className="flex flex-wrap gap-5 rounded-[20px] border-[3px] border-[#111] bg-white p-5 shadow-[6px_6px_0_#111]"
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
            className="flex items-center gap-4 rounded-[20px] border-[3px] border-[#111] bg-white p-5 shadow-[6px_6px_0_#111]"
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

      <div className="flex w-full shrink-0 flex-col gap-4 sm:w-[260px]">
        <div className="rounded-[18px] border-[3px] border-[#111] bg-[#FFD100] p-[18px]">
          <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111]">
            Streak
          </div>
          <div className="mt-0.5 font-[family-name:var(--font-display)] text-[32px] font-bold text-[#111]">
            12 <span className="text-sm font-semibold">hari</span>
          </div>
          <div className="mt-1 text-xs text-[#111]">Pertahankan!</div>
        </div>

        <div className="rounded-[18px] border-[3px] border-[#111] bg-[#111] p-[18px]">
          <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold text-white">
            Target Hari Ini
          </div>
          <div className="mt-0.5 font-[family-name:var(--font-display)] text-[26px] font-bold text-[#FFD100]">
            3<span className="text-sm text-white"> / 5 pelajaran</span>
          </div>
          <div className="mt-2.5 h-[9px] overflow-hidden rounded-full bg-[#2B2B2B]">
            <div className="h-full w-[60%] bg-[#FFD100]" />
          </div>
        </div>

        <Link
          href="/app/progress"
          className="rounded-[18px] border-[3px] border-[#111] bg-white p-[18px]"
        >
          <div className="text-[13px] font-semibold text-[#2B2B2B]">Progres Anda</div>
          <div className="mt-0.5 font-[family-name:var(--font-display)] text-[17px] font-bold text-[#111]">
            B1 Intermediate
          </div>
          <div className="mt-2.5 h-[9px] overflow-hidden rounded-full border-2 border-[#111] bg-[#E5E5E5]">
            <div className="h-full w-[73%] bg-[#FFD100]" />
          </div>
          <div className="mt-1.5 text-xs text-[#2B2B2B]">73% · Lihat detail →</div>
        </Link>
      </div>
    </>
  );
}
