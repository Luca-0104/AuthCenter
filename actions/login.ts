"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/verification-token";
import { sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  const {email, password} = validatedFields.data;
  
  // check email
  // If registered with OAuth, there will not be password
  const user = await getUserByEmail(email);
  if (!user || !user.email) return {error: "Email does not exist!"};
  if (!user.password) return {error: "This email was used with OAuth providers! (Not registered with credentials)"};

  // check the password before sending verification email
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return {error: "Wrong credentials!"};

  // check if the user verified their email
  if (!user.emailVerified) {
    // generate a new token for verification
    const verificationToken = await generateVerificationToken(user.email);
    if (!verificationToken) return {error: "Failed to generate verification token!"};
    // send the email for verification token
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: "Confirmation email sent!"};
  }

  // user can still bypass our verification checking here, and just using the api
  // so the verification check should also be performed in the signIn call back to prevent this.
  // The signIn call back is defined in the auth.config.ts

  // sign in the user using NextAuth
  // the credential checking logic was written in the "auth.config.ts" provider - credentials, this is weird
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