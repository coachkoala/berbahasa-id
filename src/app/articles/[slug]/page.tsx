import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getRelatedVocabulary, formatDate } from "@/lib/articles";
import { Section } from "@/components/Section";
import { VocabularyTable } from "@/components/VocabularyTable";
import { PracticeReading } from "@/components/PracticeReading";
import { ConversationBlock } from "@/components/ConversationBlock";
import { ExpressionsList } from "@/components/ExpressionsList";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/" className="text-sm text-indigo-600 hover:underline">
        ← Semua artikel
      </Link>

      {/* HEADER */}
      <header className="mt-4 flex flex-col gap-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">{article.level}</span>
          <span>{formatDate(article.date)}</span>
          <span aria-hidden>·</span>
          <span>{article.readTimeMinutes} min baca</span>
          {article.isExample && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">Artikel Contoh</span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{article.titleEn}</h1>
          <p className="mt-2 text-base text-slate-500">{article.titleId}</p>
        </div>

        <p className="text-xs text-slate-400">
          Ringkasan &amp; parafrase ditulis ulang oleh berbahasa.id, bukan salinan langsung. Sumber:{" "}
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-indigo-600 hover:underline"
          >
            {article.source.name}
          </a>
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-10">
        {/* THE NEWS */}
        <Section title="The News">
          <div className="flex flex-col gap-4">
            {article.newsParagraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-slate-800 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        {/* KEY VOCABULARY */}
        <Section title="Key Vocabulary">
          <VocabularyTable items={article.vocabulary} />
        </Section>

        {/* PRACTICE READING */}
        <Section title="Practice Reading" subtitle="Baca bahasa Inggris dulu, coba pahami sebelum lihat terjemahan.">
          <PracticeReading sentences={article.practice} />
        </Section>

        {/* CONVERSATION */}
        <Section title="Conversation">
          <ConversationBlock lines={article.conversation} />
        </Section>

        {/* USEFUL EXPRESSIONS */}
        <Section title="Useful Expressions">
          <ExpressionsList expressions={article.expressions} />
        </Section>

        {/* MICRO-EXERCISE */}
        <Section title="Micro-Exercise" subtitle="Latihan produksi bahasa singkat — belum ada validasi otomatis.">
          <MicroExercise slug={article.slug} prompt={article.microExercise} />
        </Section>

        {/* RELATED VOCABULARY */}
        {relatedVocabulary.length > 0 && (
          <Section title="Related Vocabulary" subtitle="Pengulangan kosakata dari artikel-artikel sebelumnya.">
            <RelatedVocabulary entries={relatedVocabulary} />
          </Section>
        )}
      </div>
    </article>
  );
}
