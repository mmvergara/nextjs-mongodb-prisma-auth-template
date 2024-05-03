import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      console.log("jwt callback", token);
      return token;
    },
  },

  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
