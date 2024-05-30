import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      }
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      }
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // expire in 1 h

  // if the current email already has a token, we remove it
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    try {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        }
      })
    } catch (error) {
      return null;
    }
  }

  // generate new verification token for this email
  try {
    const newPasswordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    })
    return newPasswordResetToken;
  } catch (error) {
    return null;
  }
};