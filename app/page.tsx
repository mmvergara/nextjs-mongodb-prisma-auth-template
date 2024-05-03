import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        NextJS + MongoDB + Prisma + Auth Template
      </h1>
      <p>Session : {session ? session?.user?.email : "No session"}</p>
      <section className="flex gap-4 flex-col items-center justify-center">
        <Link href="/sign-in" className="p-2 bg-blue-700 rounded-lg px-6">
          Sign In
        </Link>

        <Link href="/dashboard" className="p-2 bg-blue-700 rounded-lg px-6">
          Dashboard Page (Protected)
        </Link>
      </section>
    </main>
  );
}
