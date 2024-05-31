import { signOut } from 'next-auth/react';
import React from 'react'

interface Props {
  children?: React.ReactNode,
}

export const LogoutButton = ({ children }: Props) => {
  const onClick = () => {
    signOut();
  };
  return (
    <span onClick={onClick} className='cursor-pointer'>
      { children }
    </span>
  )
}
