

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col gap-4 pt-[10vh] text-white">
      <h1 className="text-5xl text-center bg-[hsl(0,0%,7%)] p-4 rounded-sm font-semibold">
        NextJS + MongoDB + Prisma Template
      </h1>

      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="p-2 rounded-md outline-none drop-shadow-sm bg-[hsl(0,0%,10%)]"
        />
        <button className="p-2 bg-[hsl(0,0%,7%)] rounded-sm">Submit</button>
      </form>
    </main>
  );
}
