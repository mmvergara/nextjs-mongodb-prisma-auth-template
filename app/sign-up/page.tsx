"use client";
import * as z from "zod";
import { signUpSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { signUpAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState<z.infer<typeof signUpSchema>>({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) return setError(error.issues[0].message);

    startTransition(() => {
      signUpAction(formValues).then((res) => {
        if (res?.error) return setError(res.error);
        router.push("/sign-in");
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleInputChange}
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="password"
          name="password"
          placeholder="●●●●●●●"
          value={formValues.password}
          onChange={handleInputChange}
          className="p-2 px-4 rounded-sm outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <button className="p-2 px-4 bg-[hsl(0,0%,7%)] rounded-lg">
          {isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <Link href="/sign-in" className="text-gray-400">
        I already have an account
      </Link>
    </main>
  );
}
