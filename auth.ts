import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { signInSchema } from "./lib/zod";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter, // refer to https://github.com/nextauthjs/next-auth/issues/7727
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("============");
          console.log(credentials);
          console.log("============");

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
          console.log("=======errr=====");
          console.log(error); // log the error

          return null;
        }
      },
    }),
  ],
});
