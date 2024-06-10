"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/data/verification-token";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";


export const setting = async (values: z.infer<typeof SettingsSchema>) => {
  // get user from session
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  // get user from db
  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  // OAuth users should not modify the following
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // check if the email changed
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }
    // send verification token for changing email
    const verificationToken = await generateVerificationToken(values.email);
    if (!verificationToken) return { error: "Something went wrong with the token, try again later!" };
    await sendVerificationEmail(values.email, verificationToken.token);
    return { success: "Verification email sent!" };
  }

  // check if the password changed
  if (values.password && values.newPassword && dbUser.password) {
    const psdMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!psdMatch) {
      return { error: "Old password does not match!" };
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {id: dbUser.id},
    data: {
      ...values
    }
  });

  return { success: "Setting Updated!" };
}