import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter, // refer to https://github.com/nextauthjs/next-auth/issues/7727
  providers: [],
});
