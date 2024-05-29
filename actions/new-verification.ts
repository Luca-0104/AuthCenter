"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verifyToken = async (token: string) => {
  // query the verification token obj from database
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return {error: "Token does not exist!"};

  // check expiration
  const isExpired = new Date(existingToken.expires) < new Date();
  if (isExpired) return {error: "Token expired!"};

  // get the user from database using the email in this token
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return {error: "Email does not exist!"};
  
  // update the emailVerified field of user in the database
  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  // remove the verification token from database
  await db.verificationToke.delete({
    where: {
      id: existingToken.id,
    }
  })

  return {success: "Email verified!"};
};