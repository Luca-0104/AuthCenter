import React from 'react'
import { CardWrapper } from './card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface Props {
  errorMessage: string,
}

const ErrorCard = ({errorMessage}: Props) => {
  return (
    <CardWrapper
      headerLabel={`${errorMessage} 🈲`}
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
        <div className='flex items-center justify-center w-full'>
          <ExclamationTriangleIcon className='text-destructive size-10' />
        </div>
    </CardWrapper>
  )
}

export default ErrorCard