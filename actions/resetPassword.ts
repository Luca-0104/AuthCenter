"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid email!"};
  }

  const {email} = validatedFields.data;

  // check the email
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) return {error: "Email does not exist!"};
  if (!existingUser.password) return {error: "This email was used with OAuth providers! (Not registered with credentials)"};

  // generate password reset token

  // send the email with token
  

}