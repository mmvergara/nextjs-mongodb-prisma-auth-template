import { auth } from "@/auth";

import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main>
      <Link className="home-link" href="/">
        ◄ Home
      </Link>
      <section className="main-container">
        <h1 className="header-text">This is a Protected Page</h1>
        <p>Current User username : {session?.user?.email || "None"}</p>
      </section>
    </main>
  );
};

export default DashboardPage;
