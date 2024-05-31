import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  if (!token) return null;
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token }
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  if (!email) return null;
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email }
    });
  } catch {
    return null;
  }
};