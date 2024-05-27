"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  // sign in the user using NextAuth
  // the credential checking logic was written in the "auth.config.ts" provider - credentials, this is weird
  const {email, password} = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Wrong credentials!"}
        default:
          return {error: "Something wrong happened!"}
      }
    }
    throw error;
  }
  return {success: "Login success"};
};