import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  if (!userId) return null;
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId }
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};