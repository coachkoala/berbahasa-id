import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, formatDate } from "@/lib/articles";
import { NewsSection } from "@/components/NewsSection";
import { VocabularyList } from "@/components/VocabularyList";
import { ConversationBubbles } from "@/components/ConversationBubbles";
import { ExpressionsList } from "@/components/ExpressionsList";
import { PrintButton } from "@/components/PrintButton";

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
    title: `${article.titleEn} (PDF) — berbahasa.id`,
  };
}

export default async function ArticlePrintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <div className="w-full px-4 py-6 sm:px-6 print:px-0 print:py-0">
      <div className="mb-5 flex items-center gap-3 print:hidden">
        <Link href={`/app/articles/${article.slug}`} className="text-sm font-semibold text-[#111] underline">
          ← Kembali ke artikel
        </Link>
        <PrintButton />
      </div>

      <article className="flex flex-col gap-6 print:gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#2B2B2B] print:text-[10px]">
            <span>{article.level}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>·</span>
            <span>{article.readTimeMinutes} min baca</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#111] print:text-lg">
            {article.titleEn}
          </h1>
          <p className="text-sm text-[#2B2B2B]">{article.titleId}</p>
          <p className="text-xs text-[#8a8a8a]">
            Ringkasan &amp; parafrase ditulis ulang oleh berbahasa.id. Sumber: {article.source.name} ({article.source.url})
          </p>

          {article.coverImage && (
            <div className="relative mt-1 aspect-[3/2] w-full overflow-hidden rounded-lg border-[3px] border-[#111] print:rounded-none">
              <Image src={article.coverImage.src} alt={article.coverImage.alt} fill className="object-cover" />
            </div>
          )}
        </header>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Artikel
          </h2>
          <NewsSection paragraphs={article.news} vocabulary={article.vocabulary} />
        </section>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Kosakata
          </h2>
          <VocabularyList items={article.vocabulary} />
        </section>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Latihan Membaca
          </h2>
          <div className="flex flex-col gap-2.5">
            {article.practice.map((sentence, index) => (
              <div key={index}>
                <p className="text-sm font-medium leading-relaxed text-[#111]">{sentence.en}</p>
                <p className="text-xs italic text-[#8a8a8a]">{sentence.id}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Dialog
          </h2>
          <ConversationBubbles lines={article.conversation} />
        </section>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Ekspresi Berguna
          </h2>
          <ExpressionsList expressions={article.expressions} />
        </section>

        <section className="flex flex-col gap-2 break-inside-avoid-page">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wide text-[#111]">
            Kuis
          </h2>
          <div className="flex flex-col gap-3">
            {article.quiz.map((q, index) => (
              <div key={index} className="rounded-lg border-2 border-[#111] p-3">
                <p className="text-sm font-semibold text-[#111]">
                  {index + 1}. {q.question}
                </p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {q.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={`text-sm ${optionIndex === q.correctIndex ? "font-semibold text-[#111]" : "text-[#2B2B2B]"}`}
                    >
                      {optionIndex === q.correctIndex ? "✓ " : "· "}
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-[#8a8a8a]">{q.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
