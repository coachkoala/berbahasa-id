import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedVocabulary,
  getAdjacentArticles,
  formatDate,
} from "@/lib/articles";
import { AccordionSection } from "@/components/AccordionSection";
import { CoverImage } from "@/components/CoverImage";
import { NewsSection } from "@/components/NewsSection";
import { VocabularyList } from "@/components/VocabularyList";
import { Flashcards } from "@/components/Flashcards";
import { PracticeReading } from "@/components/PracticeReading";
import { ConversationBubbles } from "@/components/ConversationBubbles";
import { ExpressionsList } from "@/components/ExpressionsList";
import { Quiz } from "@/components/Quiz";
import { MicroExercise } from "@/components/MicroExercise";
import { RelatedVocabulary } from "@/components/RelatedVocabulary";

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
  const relatedVocabulary = getRelatedVocabulary(article, allArticles);
  const { newer, older } = getAdjacentArticles(article, allArticles);

  return (
    <article className="px-4 py-6 sm:px-6">
      {/* PREV / LIST / NEXT NAV */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        {older ? (
          <Link
            href={`/articles/${older.slug}`}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span className="flex-1 rounded-lg border border-slate-100 px-3 py-2 text-center font-medium text-slate-300">
            ← Sebelumnya
          </span>
        )}
        <Link
          href="/"
          title="Semua artikel"
          className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 hover:border-emerald-300"
        >
          🏠
        </Link>
        {newer ? (
          <Link
            href={`/articles/${newer.slug}`}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
          >
            Berikutnya →
          </Link>
        ) : (
          <span className="flex-1 rounded-lg border border-slate-100 px-3 py-2 text-center font-medium text-slate-300">
            Berikutnya →
          </span>
        )}
      </div>

      {/* HEADER */}
      <header className="mb-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{article.level}</span>
          <span>{formatDate(article.date)}</span>
          <span aria-hidden>·</span>
          <span>{article.readTimeMinutes} min baca</span>
          {article.isExample && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">Artikel Contoh</span>
          )}
        </div>

        <div>
          <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{article.titleEn}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{article.titleId}</p>
        </div>

        <p className="text-xs text-slate-400">
          Ringkasan &amp; parafrase ditulis ulang oleh berbahasa.id, bukan salinan langsung. Sumber:{" "}
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-emerald-600 hover:underline"
          >
            {article.source.name}
          </a>
        </p>

        {article.coverImage && (
          <div className="mt-1">
            <CoverImage image={article.coverImage} />
          </div>
        )}
      </header>

      <div className="flex flex-col gap-3">
        <AccordionSection icon="📖" title="Article">
          <NewsSection paragraphs={article.news} vocabulary={article.vocabulary} />
        </AccordionSection>

        <AccordionSection icon="📚" title="Vocabulary">
          <VocabularyList items={article.vocabulary} />
        </AccordionSection>

        <AccordionSection icon="📝" title="Practice Reading" defaultOpen={false}>
          <p className="mb-3 text-xs text-slate-400">Baca bahasa Inggris dulu, coba pahami sebelum lihat terjemahan.</p>
          <PracticeReading sentences={article.practice} />
        </AccordionSection>

        <AccordionSection icon="💬" title="Dialogue">
          <ConversationBubbles lines={article.conversation} />
        </AccordionSection>

        <AccordionSection icon="🃏" title="Flashcard" defaultOpen={false}>
          <Flashcards items={article.vocabulary} />
        </AccordionSection>

        <AccordionSection icon="🗣️" title="Useful Expressions" defaultOpen={false}>
          <ExpressionsList expressions={article.expressions} />
        </AccordionSection>

        <AccordionSection icon="❓" title="Quiz" defaultOpen={false}>
          <Quiz questions={article.quiz} />
        </AccordionSection>

        <AccordionSection icon="✍️" title="Micro-Exercise" defaultOpen={false}>
          <p className="mb-3 text-xs text-slate-400">Latihan produksi bahasa singkat — belum ada validasi otomatis.</p>
          <MicroExercise slug={article.slug} prompt={article.microExercise} />
        </AccordionSection>

        {relatedVocabulary.length > 0 && (
          <AccordionSection icon="🔁" title="Related Vocabulary">
            <RelatedVocabulary entries={relatedVocabulary} />
          </AccordionSection>
        )}
      </div>
    </article>
  );
}
