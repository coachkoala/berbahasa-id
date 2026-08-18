"use client";

import { useEffect, useState } from "react";

export function MicroExercise({ slug, prompt }: { slug: string; prompt: string }) {
  const storageKey = `berbahasa-id:micro-exercise:${slug}`;
  const [value, setValue] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    const frame = requestAnimationFrame(() => setValue(saved));
    return () => cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.trim().length === 0) return;
      window.localStorage.setItem(storageKey, value);
      setSavedAt(Date.now());
    }, 500);
    return () => clearTimeout(timeout);
  }, [value, storageKey]);

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 sm:p-6">
      <p className="text-sm font-medium text-slate-800">{prompt}</p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Tulis jawabanmu di sini..."
        rows={4}
        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
      <p className="mt-2 text-xs text-slate-400">
        {savedAt ? "Tersimpan otomatis di perangkat ini." : "Belum ada validasi otomatis — cukup latihan menulis bebas."}
      </p>
    </div>
  );
}
