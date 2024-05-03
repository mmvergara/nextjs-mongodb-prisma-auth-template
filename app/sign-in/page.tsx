"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import { SignInValues } from "@/lib/zod";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState<SignInValues>({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      signInAction(formValues).then((res) => {
        if (res?.error) setError(res.error);
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={formValues.email}
          disabled={isPending}
          placeholder="Email"
          className="p-2 px-4 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●"
          onChange={handleInputChange}
          value={formValues.password}
          disabled={isPending}
          className="p-2 px-4 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <button className="p-2 bg-[hsl(0,0%,7%)] rounded-lg">
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <Link href="/sign-up" className="text-gray-400">
        Don't have an account? Sign up
      </Link>
    </main>
  );
}
