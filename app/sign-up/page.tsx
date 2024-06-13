"use client";
import { signUpSchema } from "@/lib/form-schemas";
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
        className="bg-zinc-800 hover:bg-zinc-900 p-2 px-8 rounded-lg"
      >
        {"<-"} Home
      </Link>
      <form
        action={handleFormSubmit}
        className="flex flex-col gap-2 bg-zinc-800 p-10 rounded-md w-full max-w-[450px] mx-2"
      >
        <h1 className="text-3xl text-center rounded-sm font-semibold">
          Sign Up
        </h1>
        <p className="text-red-500 text-center">{error}</p>
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
          className="p-2 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
        >
          Create Account
        </SubmitButton>
        <Link
          href="/sign-in"
          className="text-gray-400 text-center hover:underline"
        >
          I already have an account
        </Link>
      </form>
    </main>
  );
}
