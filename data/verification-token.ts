import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToke.findFirst({
      where: { email }
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToke.findUnique({
      where: { token }
    })
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // expire in 1 h

  // if the current email already has a token, we remove it
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    try {
      await db.verificationToke.delete({
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
    const newVerificationToken = await db.verificationToke.create({
      data: {
        email,
        token,
        expires
      }
    })
    return newVerificationToken;
  } catch (error) {
    return null;
  }
}