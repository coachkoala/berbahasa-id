"use client";

import { useState } from "react";
import type { PracticeSentence } from "@/lib/articles";

function RevealableSentence({ sentence }: { sentence: PracticeSentence }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed((prev) => !prev)}
      className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 sm:p-5"
      aria-expanded={revealed}
    >
      <p className="text-base font-medium leading-relaxed text-slate-900 sm:text-lg">{sentence.en}</p>

      {revealed ? (
        <p className="mt-2 text-sm text-slate-400">{sentence.id}</p>
      ) : (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-emerald-600">
          Tap untuk lihat terjemahan
        </p>
      )}
    </button>
  );
}

export function PracticeReading({ sentences }: { sentences: PracticeSentence[] }) {
  return (
    <div className="flex flex-col gap-3">
      {sentences.map((sentence, index) => (
        <RevealableSentence key={index} sentence={sentence} />
      ))}
    </div>
  );
}
