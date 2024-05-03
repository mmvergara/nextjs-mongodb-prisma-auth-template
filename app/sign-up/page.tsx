"use client";
import * as z from "zod";
import { signUpSchema } from "@/lib/zod";
import { startTransition, useState } from "react";
import { signUpAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
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
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        Sign Up Page
      </h1>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          placeholder="username"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <button className="p-2 bg-[hsl(0,0%,7%)] rounded-sm">Submit</button>
      </form>
    </main>
  );
}
