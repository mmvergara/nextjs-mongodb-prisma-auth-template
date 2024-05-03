import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <main className="text-white">Settigns Page {JSON.stringify(session)}</main>
  );
};

export default SettingsPage;
