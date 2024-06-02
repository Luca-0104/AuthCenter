"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/verification-token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import { generateTwoFactorToken, getTwoFactorTokenByEmail, getTwoFactorTokenByToken } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  const {email, password, code} = validatedFields.data;
  
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

  // send two factor verification email if user is enabled this
  if (user.isTwoFactorEnabled) {
    // if have the code, this means user clicked on the confirm button, we need to verify the 2FA code here
    if (code) {
      const existing2FAToken = await getTwoFactorTokenByEmail(user.email);
      if (!existing2FAToken || existing2FAToken.token !== code) return {error: "Invalid 2FA code!"};
      // check expiration
      if (new Date(existing2FAToken.expires) < new Date()) return {error: "Code has expired!"};
      
      // if everything is ok, just remove the token from database
      await db.twoFactorToken.delete({
        where: {id: existing2FAToken.id}
      });

      // Generate the 2FA confirmation record in the db, 
      // therefore, this will be verified in the signIn callback latter.
      // we will delete the exiting one if there is one
      const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);
      if (existingTwoFactorConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingTwoFactorConfirmation.id
          }
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: user.id,
        }
      });

    } else {
      // if do not have the code, this means user just clicked on the login button, we need to send them the 2FA code
      const twoFactorToken = await generateTwoFactorToken(user.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { IsTwoFactor: true }
    }
  }

  // sign in the user using NextAuth
  // the credential checking logic was written in the "auth.config.ts" provider - credentials, this is weird
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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