import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111]">Berita</h1>
        <p className="mt-1 text-sm text-[#2B2B2B]">Satu ringkasan berita bahasa Inggris setiap hari.</p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
