import { useSession } from "next-auth/react";

/**
 * This encapsulates how we fetch session from the client side
 */
export const useCurrentUser = (required: boolean = false) => {
  // This ! is ! so ! fucking ! weird!!!!
  // If we do not set `{ required: true }`, the useSession cannot get anything after logging in, until refresh!!!!
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  // const session = useSession({ required: true });
  const session = useSession({ required: required });
  return session.data?.user;
};