import { auth } from "@/auth";

/**
 * This encapsulates how we fetch session from the server side
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
}