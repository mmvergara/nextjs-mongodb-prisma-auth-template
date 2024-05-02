import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        NextJS + MongoDB + Prisma + Auth Template
      </h1>

      <Link href="/sign-in" className="p-2 bg-[hsl(0,0%,7%)] rounded-sm">
        Sign In
      </Link>

      <Link href="/sign-up" className="p-2 bg-[hsl(0,0%,7%)] rounded-sm">
        Sign Up
      </Link>
    </main>
  );
}
