import { auth } from '@/auth';
import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';
import React from 'react'

/**
 * Fetch session on "server" side
 */
const Server = async () => {
  const user = await currentUser();

  return (
    <UserInfo user={user} label={"🔞 Server Component"}/>
  )
}

export default Server