import { auth } from '@/auth';
import { currentUser } from '@/lib/auth';
import React from 'react'

/**
 * Fetch session on "server" side
 */
const Server = async () => {
  const user = await currentUser();

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default Server