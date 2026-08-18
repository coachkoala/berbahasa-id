"use client";

import { useState } from "react";
import type { VocabularyItem } from "@/lib/articles";

export function Flashcards({ items }: { items: VocabularyItem[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (items.length === 0) return null;

  const card = items[index];

  function goTo(nextIndex: number) {
    setIndex((nextIndex + items.length) % items.length);
    setFlipped(false);
  }

  return (
    <div>
      <p className="mb-3 text-xs text-slate-400">Tap kartu untuk membalik</p>

      <button
        type="button"
        onClick={() => setFlipped((prev) => !prev)}
        className="relative flex h-40 w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-center transition hover:border-emerald-300"
      >
        {flipped ? (
          <div className="text-lg font-semibold text-emerald-700">{card.meaningId}</div>
        ) : (
          <>
            <div className="text-xl font-bold text-slate-900">{card.word}</div>
            {card.phonetic && <div className="mt-1 font-mono text-xs text-slate-500">{card.phonetic}</div>}
            <div className="mt-2 text-xs text-slate-400">tap</div>
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Prev
        </button>
        <span className="shrink-0 text-xs text-slate-400">
          {index + 1}/{items.length}
        </span>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
