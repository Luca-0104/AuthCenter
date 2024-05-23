import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 to-purple-700 h-full flex items-center justify-center'>
      {children}
    </div>
  )
}

export default AuthLayout