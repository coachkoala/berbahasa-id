import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getAdjacentArticles, formatDate } from "@/lib/articles";
import { AccordionSection } from "@/components/AccordionSection";
import { CoverImage } from "@/components/CoverImage";
import { NewsSection } from "@/components/NewsSection";
import { VocabularyList } from "@/components/VocabularyList";
import { PracticeReading } from "@/components/PracticeReading";
import { ConversationBubbles } from "@/components/ConversationBubbles";
import { ExpressionsList } from "@/components/ExpressionsList";
import { Quiz } from "@/components/Quiz";
import { BookmarkButton } from "@/components/BookmarkButton";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.titleEn} — berbahasa.id`,
    description: article.titleId,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = getAllArticles();
  const { newer, older } = getAdjacentArticles(article, allArticles);

  return (
    <article className="flex w-full max-w-[760px] flex-col gap-4">
      {/* PREV / LIST / NEXT NAV */}
      <div className="flex items-center gap-2.5">
        {older ? (
          <Link
            href={`/app/articles/${older.slug}`}
            className="flex-1 rounded-xl border-[2.5px] border-[#111] bg-white px-3 py-2.5 text-center font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span className="flex-1 rounded-xl border-[2.5px] border-[#E5E5E5] px-3 py-2.5 text-center font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#6b6b6b]">
            ← Sebelumnya
          </span>
        )}
        <Link
          href="/app/news"
          title="Semua berita"
          className="shrink-0 rounded-xl border-[2.5px] border-[#111] bg-white px-2.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
        >
          ☰
        </Link>
        {newer ? (
          <Link
            href={`/app/articles/${newer.slug}`}
            className="flex-1 rounded-xl border-[2.5px] border-[#111] bg-white px-3 py-2.5 text-center font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
          >
            Berikutnya →
          </Link>
        ) : (
          <span className="flex-1 rounded-xl border-[2.5px] border-[#E5E5E5] px-3 py-2.5 text-center font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#6b6b6b]">
            Berikutnya →
          </span>
        )}
      </div>

      {/* HEADER */}
      <header className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border-2 border-[#111] bg-[#FFD100] px-2.5 py-[3px] font-[family-name:var(--font-display)] text-[11.5px] font-bold">
            {article.level}
          </span>
          <span className="text-xs text-[#2B2B2B]">{formatDate(article.date)}</span>
          <span className="text-xs text-[#2B2B2B]">· {article.readTimeMinutes} min baca</span>
          <BookmarkButton slug={article.slug} />
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-[26px] font-bold leading-[1.25] text-[#111]">
          {article.titleEn}
        </h1>
        <p className="text-[15px] text-[#2B2B2B]">{article.titleId}</p>
        <p className="text-xs text-[#6b6b6b]">
          Ringkasan &amp; parafrase ditulis ulang oleh berbahasa.id. Sumber:{" "}
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-semibold text-[#111]"
          >
            {article.source.name}
          </a>
        </p>

        {article.coverImage && (
          <div className="mt-1.5">
            <CoverImage image={article.coverImage} />
          </div>
        )}
      </header>

      <div className="flex flex-col gap-3.5">
        <AccordionSection title="Artikel">
          <NewsSection paragraphs={article.news} vocabulary={article.vocabulary} />
        </AccordionSection>

        <AccordionSection title="Kosakata">
          <VocabularyList items={article.vocabulary} />
        </AccordionSection>

        <AccordionSection title="Latihan Membaca" defaultOpen={false}>
          <p className="mb-2.5 text-xs text-[#6b6b6b]">
            Baca bahasa Inggris dulu, coba pahami sebelum lihat terjemahan.
          </p>
          <PracticeReading sentences={article.practice} />
        </AccordionSection>

        <AccordionSection title="Dialog">
          <ConversationBubbles lines={article.conversation} />
        </AccordionSection>

        <AccordionSection title="Ekspresi Berguna" defaultOpen={false}>
          <ExpressionsList expressions={article.expressions} />
        </AccordionSection>

        <AccordionSection title="Kuis" defaultOpen={false}>
          <Quiz questions={article.quiz} />
        </AccordionSection>

        <Link
          href={`/app/articles/${article.slug}/print`}
          className="flex items-center justify-center gap-2 rounded-[18px] border-[3px] border-dashed border-[#111] bg-white px-4 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
        >
          📄 Unduh PDF (A5, enak dibaca di HP)
        </Link>
      </div>
    </article>
  );
}
