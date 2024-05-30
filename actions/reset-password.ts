"use server";

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";


export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>, token?: string | null) => {
  if (!token) return {error: "Missing token!"};

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) return {error: "Invalid password!"};

  const {password} = validatedFields.data;

  // check the token
  const existingPasswordResetToken = await getPasswordResetTokenByToken(token);
  if (!existingPasswordResetToken) return {error: "Invalid token"};

  // check the token expiration
  if (new Date(existingPasswordResetToken.expires) < new Date()) return {error: "Token has expired!"};

  // check the user from the token email
  const existingUser = await getUserByEmail(existingPasswordResetToken.email);
  if (!existingUser) return {error: "Email does not exist!"};

  // update password
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  // remove the token from database
  await db.passwordResetToken.delete({
    where: {
      id: existingPasswordResetToken.id
    }
  });

  return {success: "Password updated!"};
};