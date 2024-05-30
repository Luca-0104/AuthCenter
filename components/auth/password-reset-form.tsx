"use client";

import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import * as z from "zod";
import { ResetPasswordSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/actions/reset-password';

// PasswordResetForm is the form requires two password to update the user password
// This form can be accessed by users by clicking in the link in the email they receive
export const PasswordResetForm = () => {
  const searchParams = useSearchParams();
  const passwordResetToken = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values, passwordResetToken)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
      })
    });
  };

  return (
    <CardWrapper 
      headerLabel="Set your new password 🔞"
      backButtonLabel="Back to login?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='******' type='password' disabled={isPending}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full' disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
