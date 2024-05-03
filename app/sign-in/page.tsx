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
        className="bg-[hsl(0,0%,7%)] hover:bg-[hsl(0,0%,10%)] p-2 px-8 rounded-lg"
      >
        {"<-"} Home
      </Link>
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        Sign In Page
      </h1>
      <p className="text-red-500">{error}</p>
      <form action={handleFormSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="p-2 px-4 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●"
          className="p-2 px-4 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <SubmitButton
          pendingText="Signing in..."
          className="p-2 bg-[hsl(0,0%,7%)] rounded-lg"
        >
          Sign In
        </SubmitButton>
      </form>
      <Link href="/sign-up" className="text-gray-400">
        Don't have an account? Sign up
      </Link>
    </main>
  );
}
