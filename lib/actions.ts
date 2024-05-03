"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "./prisma";
import { SignInValues, SignUpValues } from "./zod";
import { hashSync } from "bcryptjs";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const signInAction = async (signInValues: SignInValues) => {
  try {
    await signIn("credentials", signInValues);
    return { error: null };
  } catch (error) {
    console.log("ERRORR OCCURED SIGNIN ACTION", error);
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  try {
    await prisma.user.create({
      data: {
        ...signUpValues,
        password: hashSync(signUpValues.password, 10),
      },
    });
  } catch (error) {
    const e = error as PrismaClientValidationError;
    console.log(e);
    console.log(e.cause);
    console.log(e.message);
    return { error: "An error occurred" };
  }
};
