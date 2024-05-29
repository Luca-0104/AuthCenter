"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from './card-wrapper'
import { BeatLoader, ClipLoader, BarLoader } from "react-spinners";
import { useSearchParams } from 'next/navigation';
import { verifyToken } from '@/actions/new-verification';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // useCallback cache the function
  // if token changed, the onSubmit function will be recreated
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    verifyToken(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    }).catch(() => {
      setError("Something went wrong!");
    });
  }, [token]);

  // every time onSubmit recreated, we call it
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
      <CardWrapper 
        headerLabel={'We are verifying your email...'} 
        backButtonLabel={'Back to login'} 
        backButtonHref={'/auth/login'}>
          <div className='flex items-center justify-center w-full'>
            {!error && !success && <BeatLoader loading={true} />}
            <FormError message={error}/>
            <FormSuccess message={success}/>
          </div>

      </CardWrapper>
  )
}
