"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import { SignInValues } from "@/lib/zod";
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
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        Sign In Page
      </h1>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={formValues.email}
          disabled={isPending}
          placeholder="Enter your email"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
          required
        />
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
          disabled={isPending}
          placeholder="Enter your password"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <SubmitButton
          pendingText="Creating Account..."
          className="p-2 bg-[hsl(0,0%,7%)] rounded-sm"
        >
          Create Account
        </SubmitButton>
        {/* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div> */}
      </form>
    </main>
  );
}
