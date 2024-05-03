import { auth } from "@/auth";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <h1 className="text-xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        This is a protected page
      </h1>
      <p>Hello {JSON.stringify(session?.user?.email)}</p>
      <Link
        href="/"
        className="bg-[hsl(0,0%,7%)] hover:bg-[hsl(0,0%,10%)] p-2 px-8 rounded-lg"
      >
        {"<-"} Home
      </Link>
    </main>
  );
};

export default DashboardPage;
