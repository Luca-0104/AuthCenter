import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

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
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

  // if this email already has an existing 2fa token, we delete it
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }
  // generate a new token for this email
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    }
  });
  return twoFactorToken;
};