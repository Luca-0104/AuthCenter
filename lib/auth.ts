import { auth } from "@/auth";

/**
 * This encapsulates how we fetch session from the server side
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
}

/**
 * This encapsulates how we get role from the session fetched from the server side
 */
export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
}