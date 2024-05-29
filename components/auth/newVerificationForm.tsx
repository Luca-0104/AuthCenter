"use client";

import React, { useCallback, useEffect } from 'react'
import { CardWrapper } from './card-wrapper'
import { BeatLoader, ClipLoader, BarLoader } from "react-spinners";
import { useSearchParams } from 'next/navigation';

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // useCallback cache the function
  // if token changed, the onSubmit function will be recreated
  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  // every time onSubmit recreated, we call it
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (!token) return
  return (
      <CardWrapper 
        headerLabel={'We are verifying your email...'} 
        backButtonLabel={'Back to login'} 
        backButtonHref={'/auth/login'}>
          <div className='flex items-center justify-center w-full'>
            <BeatLoader loading={true} />
          </div>

      </CardWrapper>
  )
}
