import { useSession } from "next-auth/react";

/**
 * This encapsulates how we fetch session from the client side
 */
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};