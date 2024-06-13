import * as z from "zod";
const { object, string } = z;

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  username: string({ required_error: "Username is required" })
    .min(4, "Username is required")
    .max(32, "Username must be less than 32 characters"),
});
export type SignUpValues = z.infer<typeof signUpSchema>;
