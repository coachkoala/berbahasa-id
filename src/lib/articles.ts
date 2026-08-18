import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type CoverImage = {
  src: string;
  alt: string;
  credit?: string;
};

export type VocabularyItem = {
  word: string;
  phonetic?: string;
  meaningId: string;
  exampleEn: string;
  exampleId: string;
};

export type NewsParagraph = {
  en: string;
  id: string;
};

export type PracticeSentence = {
  en: string;
  id: string;
};

export type ConversationLine = {
  speaker: "A" | "B";
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

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
  coverImage?: CoverImage;
  news: NewsParagraph[];
  vocabulary: VocabularyItem[];
  practice: PracticeSentence[];
  conversation: ConversationLine[];
  expressions: UsefulExpression[];
  quiz: QuizQuestion[];
};

export type Article = ArticleFrontmatter;

function readArticleFile(filename: string): Article {
  const filePath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return data as ArticleFrontmatter;
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

export function getAdjacentArticles(article: Article, allArticles: Article[]) {
  const index = allArticles.findIndex((candidate) => candidate.slug === article.slug);
  return {
    newer: index > 0 ? allArticles[index - 1] : undefined,
    older: index >= 0 && index < allArticles.length - 1 ? allArticles[index + 1] : undefined,
  };
}

export function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
