import { useSession } from "next-auth/react"

/**
 * This encapsulates how we get the role from session fetched from the client side
 */
export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user.role;
}