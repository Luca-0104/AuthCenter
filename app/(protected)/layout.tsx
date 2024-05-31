import React from 'react'
import { NavBar } from './_components/NavBar';

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({children}: Props) => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 to-purple-700 h-full w-full flex flex-col items-center justify-center'>
      <NavBar />
      { children }
    </div>
  )
}

export default ProtectedLayout