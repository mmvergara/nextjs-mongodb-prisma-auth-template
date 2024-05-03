import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="text-white">Settigns Page {JSON.stringify(session)}</main>
  );
};

export default DashboardPage;
