import { auth, signOut } from "@/auth";
import { SubmitButton } from "@/components/SubmitButton";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <Link
        href="/"
        className="bg-[hsl(0,0%,7%)] hover:bg-[hsl(0,0%,10%)] p-2 px-8 rounded-lg"
      >
        {"<-"} Home
      </Link>
      <section className="flex gap-4 flex-col items-center justify-center bg-zinc-900 p-8 rounded-sm">
        <h1 className="text-xl text-center rounded-sm font-semibold">
          This is a protected page
        </h1>
        <p>Hello {JSON.stringify(session?.user?.email)}</p>
        <form
          action={async () => {
            "use server";
            try {
              await signOut({ redirect: false });
            } catch (err) {
              if (isRedirectError(err)) {
                console.error(err);
                throw err;
              }
            } finally {
              redirect("/");
            }
          }}
        >
          <SubmitButton
            pendingText="Signing out..."
            className="p-2 px-4 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
          >
            Sign Out
          </SubmitButton>
        </form>
      </section>
    </main>
  );
};

export default DashboardPage;
