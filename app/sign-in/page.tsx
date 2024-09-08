"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signInAction({ email, password });
    if (res.error) {
      alert(res.error);
      return;
    }
    redirect("/");
  };

  return (
    <main>
      <Link className="home-link" href="/">
        ◄ Home
      </Link>
      <form className="main-container" action={handleFormSubmit}>
        <h1 className="header-text">Sign In</h1>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <SubmitButton pendingText="Loggin in...">Login</SubmitButton>
        <Link className="auth-link" href="/sign-up">
          Don't have an account? Sign Up
        </Link>
      </form>
    </main>
  );
}
