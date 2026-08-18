import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Daily English Learning</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Satu ringkasan berita bahasa Inggris setiap hari, level B1 Intermediate — lengkap dengan
          kosakata, latihan membaca, dan percakapan. Jelajahi arsip artikel di bawah.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-slate-400">Belum ada artikel. Tambahkan file markdown di content/articles.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
