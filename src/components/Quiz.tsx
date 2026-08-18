"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/articles";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return null;

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function handleAnswer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelected(null);
  }

  function handleReset() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const ratio = score / questions.length;
    const message = ratio === 1 ? "Sempurna." : ratio >= 0.7 ? "Bagus." : "Coba lagi.";

    return (
      <div className="rounded-[16px] border-[3px] border-[#111] bg-[#FFD100] p-5 text-center">
        <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#111]">
          {score}/{questions.length}
        </div>
        <p className="mt-1.5 text-sm font-semibold text-[#111]">{message}</p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3.5 rounded-full border-[2.5px] border-[#111] bg-[#111] px-5 py-2.5 font-[family-name:var(--font-display)] text-[13px] font-bold text-white"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3.5 text-[15px] font-bold text-[#111]">{question.question}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctIndex;
          const isSelected = optionIndex === selected;
          const showState = selected !== null;

          let bg = "bg-white";
          let textColor = "text-[#111]";
          if (showState && isCorrect) bg = "bg-[#FFD100]";
          else if (showState && isSelected && !isCorrect) {
            bg = "bg-[#E5E5E5]";
            textColor = "text-[#2B2B2B]";
          }

          return (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleAnswer(optionIndex)}
              disabled={showState}
              className={`rounded-[12px] border-[2.5px] border-[#111] px-3.5 py-3 text-left text-sm font-medium ${bg} ${textColor}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-3.5 rounded-r-[12px] border-l-4 border-[#111] bg-[#F7F5EF] px-3.5 py-3 text-[13.5px] text-[#111]">
          {question.explanation}
        </div>
      )}

      <div className="mt-3.5 flex items-center justify-between gap-3">
        <span className="text-xs text-[#8a8a8a]">
          Soal {index + 1}/{questions.length}
        </span>
        {selected !== null && (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full border-[2.5px] border-[#111] bg-[#FFD100] px-5 py-2.5 font-[family-name:var(--font-display)] text-[13px] font-bold text-[#111]"
          >
            {isLast ? "Lihat Skor" : "Berikutnya →"}
          </button>
        )}
      </div>
    </div>
  );
}
