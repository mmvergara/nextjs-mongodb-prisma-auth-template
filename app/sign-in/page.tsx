import { SubmitButton } from "@/components/SubmitButton";
import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        Sign In Page
      </h1>

      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="flex flex-col gap-2"
      >
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="email"
        >
          Password
        </label>
        <input
          type="email"
          id="email"
          value="qweqeqe@asd.com"
          name="email"
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
          value="sdasdadasd"
          type="password"
          id="password"
          name="password"
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
