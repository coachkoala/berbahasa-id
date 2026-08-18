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
    const message = ratio === 1 ? "🎉 Sempurna!" : ratio >= 0.7 ? "✅ Bagus!" : "📚 Coba lagi!";

    return (
      <div className="rounded-2xl bg-emerald-50 p-6 text-center">
        <div className="text-4xl font-bold text-emerald-700">
          {score}/{questions.length}
        </div>
        <p className="mt-2 text-sm text-slate-700">{message}</p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          🔄 Reset Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-base font-semibold text-slate-900">{question.question}</p>

      <div className="flex flex-col gap-2.5">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctIndex;
          const isSelected = optionIndex === selected;
          const showState = selected !== null;

          let stateClasses = "border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
          if (showState && isCorrect) {
            stateClasses = "border-emerald-500 bg-emerald-50 text-emerald-900";
          } else if (showState && isSelected && !isCorrect) {
            stateClasses = "border-red-400 bg-red-50 text-red-800";
          }

          return (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleAnswer(optionIndex)}
              disabled={showState}
              className={`rounded-lg border px-3.5 py-3 text-left text-sm font-medium transition ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4 rounded-md border-l-4 border-emerald-500 bg-slate-50 px-3.5 py-3 text-sm text-slate-700">
          {question.explanation}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">
          Q {index + 1}/{questions.length}
        </span>
        {selected !== null && (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {isLast ? "Lihat Skor" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}
