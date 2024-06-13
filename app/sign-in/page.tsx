"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signInAction({ email, password });
    if (res.error) {
      setError(res.error);
    }
  };

  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <Link
        href="/"
        className="bg-zinc-800 hover:bg-zinc-900 p-2 px-8 rounded-lg"
      >
        {"<-"} Home
      </Link>

      <form
        action={handleFormSubmit}
        className="flex flex-col gap-2 bg-zinc-800 p-10 rounded-md w-full max-w-[450px] mx-2"
      >
        <h1 className="text-3xl text-center rounded-sm font-semibold">
          Sign In
        </h1>
        <p className="text-red-500 text-center">{error}</p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●"
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <SubmitButton
          pendingText="Signing in..."
          className="p-2 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
        >
          Sign In
        </SubmitButton>
        <Link
          href="/sign-up"
          className="text-gray-400 text-center hover:underline"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </main>
  );
}
