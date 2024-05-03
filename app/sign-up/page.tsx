"use client";
import { signUpSchema } from "@/lib/zod";
import { SubmitButton } from "@/components/SubmitButton";
import { signUpAction } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (formData: FormData) => {
    setError("");
    const formValues = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) return setError(error.issues[0].message);

    const res = await signUpAction(formValues);
    if (res?.error) return setError(res.error);
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
        Sign Up Page
      </h1>
      <p className="text-red-500">{error}</p>
      <form action={handleFormSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="password"
          name="password"
          placeholder="●●●●●●●"
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <SubmitButton
          pendingText="Creating account..."
          className="p-2 bg-[hsl(0,0%,7%)] rounded-lg"
        >
          Create Account
        </SubmitButton>
      </form>
      <Link href="/sign-in" className="text-gray-400">
        I already have an account
      </Link>
    </main>
  );
}
