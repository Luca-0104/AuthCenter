"use client";

import { UserInfo } from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

/**
 * Fetch session on "client" side
 */
const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo 
      user={user} 
      label={"🔞 Client Component ⚤"}
      description="Following data comes from the session fetched on the client side."/>
  )
};

export default ClientPage;