"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, WordMark } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/app";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(
        error.status === 429
          ? "Terlalu banyak percobaan kirim email. Tunggu beberapa menit lalu coba lagi."
          : error.message,
      );
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-4">
      <div className="w-full max-w-sm rounded-[28px] border-[3px] border-[#111] bg-white p-8 text-center shadow-[10px_10px_0_#111]">
        <div className="flex flex-col items-center gap-2.5">
          <Logo size="md" />
          <WordMark size={20} />
        </div>

        <h1 className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-[#111]">
          Masuk ke akunmu
        </h1>
        <p className="mt-1.5 text-sm text-[#2B2B2B]">
          Kami kirim link masuk lewat email — tidak perlu password.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-2xl border-[2.5px] border-[#111] bg-[#F7F5EF] p-4 text-sm text-[#111]">
            ✅ Cek email <strong>{email}</strong> dan klik link untuk masuk.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@kamu.com"
              className="rounded-xl border-[2.5px] border-[#111] px-4 py-2.5 text-sm text-[#111] outline-none placeholder:text-[#8a8a8a]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full border-[3px] border-[#111] bg-[#FFD100] px-6 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-[#111] shadow-[4px_4px_0_#111] disabled:opacity-60"
            >
              {status === "sending" ? "Mengirim..." : "Kirim Magic Link"}
            </button>
            {status === "error" && (
              <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
            )}
            {status !== "error" && authError && (
              <p className="text-xs font-semibold text-red-600">
                Link masuk tidak valid atau sudah kedaluwarsa. Coba kirim ulang.
              </p>
            )}
          </form>
        )}

        <Link href="/" className="mt-6 inline-block text-xs font-semibold text-[#2B2B2B]">
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
