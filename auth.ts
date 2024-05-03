import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
