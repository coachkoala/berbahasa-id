import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mb-6 rounded-2xl bg-emerald-50 p-4">
        <h1 className="text-lg font-bold text-emerald-700">berbahasa.id</h1>
        <p className="mt-1 text-xs text-slate-500">News to Learn Language</p>
        <p className="mt-2 text-sm text-slate-700">
          Satu ringkasan berita bahasa Inggris setiap hari, lengkap dengan kosakata, flashcard,
          dialog, dan quiz. Jelajahi arsip artikel di bawah.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-slate-400">Belum ada artikel. Tambahkan file markdown di content/articles.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
