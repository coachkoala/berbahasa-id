import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type VocabularyItem = {
  word: string;
  phonetic?: string;
  meaningId: string;
  exampleEn: string;
  exampleId: string;
};

export type PracticeSentence = {
  en: string;
  id: string;
};

export type ConversationLine = {
  speaker: string;
  en: string;
  id: string;
};

export type UsefulExpression = {
  phrase: string;
  phonetic?: string;
  meaningId: string;
  definitionEn: string;
  exampleEn: string;
  exampleId: string;
};

export type ArticleSource = {
  name: string;
  url: string;
};

type ArticleFrontmatter = {
  slug: string;
  titleEn: string;
  titleId: string;
  date: string; // ISO yyyy-mm-dd
  level: string;
  readTimeMinutes: number;
  isExample?: boolean;
  source: ArticleSource;
  vocabulary: VocabularyItem[];
  practice: PracticeSentence[];
  conversation: ConversationLine[];
  expressions: UsefulExpression[];
  microExercise: string;
};

export type Article = ArticleFrontmatter & {
  newsParagraphs: string[];
};

function readArticleFile(filename: string): Article {
  const filePath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const newsParagraphs = content
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    ...(data as ArticleFrontmatter),
    newsParagraphs,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".md"));
  const articles = files.map(readArticleFile);

  return articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export type RelatedVocabularyEntry = {
  word: string;
  articles: { slug: string; titleEn: string; date: string }[];
};

/**
 * Naive spaced-repetition hint: for each vocabulary word in `article`, find
 * earlier articles whose own vocabulary list already contains that word.
 */
export function getRelatedVocabulary(article: Article, allArticles: Article[]): RelatedVocabularyEntry[] {
  const earlierArticles = allArticles.filter(
    (candidate) => candidate.slug !== article.slug && candidate.date < article.date,
  );

  const entries: RelatedVocabularyEntry[] = [];

  for (const vocab of article.vocabulary) {
    const word = vocab.word.toLowerCase();
    const matches = earlierArticles
      .filter((candidate) => candidate.vocabulary.some((v) => v.word.toLowerCase() === word))
      .map((candidate) => ({ slug: candidate.slug, titleEn: candidate.titleEn, date: candidate.date }));

    if (matches.length > 0) {
      entries.push({ word: vocab.word, articles: matches });
    }
  }

  return entries;
}

export function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
