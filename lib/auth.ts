import { auth } from "@/auth";

/**
 * For fetching session on the server side
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
}