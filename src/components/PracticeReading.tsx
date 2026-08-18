"use client";

import { useState } from "react";
import type { PracticeSentence } from "@/lib/articles";

function RevealableSentence({ sentence }: { sentence: PracticeSentence }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed((prev) => !prev)}
      className="w-full rounded-[14px] border-[2.5px] border-[#111] bg-[#F7F5EF] p-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      aria-expanded={revealed}
    >
      <p className="text-[15px] font-medium leading-relaxed text-[#111]">{sentence.en}</p>

      {revealed ? (
        <p className="mt-1.5 text-[13.5px] italic text-[#2B2B2B]">{sentence.id}</p>
      ) : (
        <p className="mt-1.5 text-[11.5px] font-bold uppercase tracking-wide text-[#6b6b6b]">
          Ketuk untuk lihat terjemahan
        </p>
      )}
    </button>
  );
}

export function PracticeReading({ sentences }: { sentences: PracticeSentence[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {sentences.map((sentence, index) => (
        <RevealableSentence key={index} sentence={sentence} />
      ))}
    </div>
  );
}
