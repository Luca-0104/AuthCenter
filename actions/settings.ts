"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

export const setting = async (values: z.infer<typeof SettingsSchema>) => {
  // get user from session
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  // get user from db
  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  await db.user.update({
    where: {id: dbUser.id},
    data: {
      ...values
    }
  });

  return { success: "Setting Updated!" };
}