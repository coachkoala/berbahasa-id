"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, WordMark } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/app";
  const authError = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
    // On success, the browser navigates away to Google — nothing else to do here.
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
        <p className="mt-1.5 text-sm text-[#2B2B2B]">Satu klik, tidak perlu password.</p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full border-[3px] border-[#111] bg-white px-6 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-[#111] shadow-[4px_4px_0_#111] disabled:opacity-60"
        >
          <GoogleIcon />
          {loading ? "Mengalihkan..." : "Masuk dengan Google"}
        </button>

        {errorMessage && <p className="mt-3 text-xs font-semibold text-red-600">{errorMessage}</p>}
        {!errorMessage && authError && (
          <p className="mt-3 text-xs font-semibold text-red-600">
            Gagal masuk. Coba lagi sebentar lagi.
          </p>
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
