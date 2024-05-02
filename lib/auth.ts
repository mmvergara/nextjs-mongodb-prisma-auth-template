import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import { signInSchema } from "./zod";
import { compare } from "bcryptjs";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter, // refer to https://github.com/nextauthjs/next-auth/issues/7727
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) return null;

          const isCorrectPassword = await compare(password, user.password);
          if (!isCorrectPassword) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
