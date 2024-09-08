"use client";
import { signUpSchema } from "@/lib/form-schemas";
import { SubmitButton } from "@/components/SubmitButton";
import { signUpAction } from "@/lib/actions";
import Link from "next/link";

export default function SignUpPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const formValues = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) {
      alert(error.issues[0].message);
    }

    const res = await signUpAction(formValues);
    if (res?.error) {
      alert(res.error);
    }
  };

  return (
    <main>
      <Link className="home-link" href="/">
        ◄ Home
      </Link>
      <form className="main-container" action={handleFormSubmit}>
        <h1 className="header-text">Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          Demo app, please don't use your real email or password
        </p>
        <input name="username" type="text" placeholder="Username" />
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <SubmitButton pendingText="Creating account...">
          Create Account
        </SubmitButton>
        <Link className="auth-link" href="/sign-in">
          Already have an account? Sign In
        </Link>
      </form>
    </main>
  );
}
