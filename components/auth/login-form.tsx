"use client";

import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import * as z from "zod";
import { LoginSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useTransition } from 'react';
import Link from 'next/link';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });


  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.IsTwoFactor) {
            setShowTwoFactor(true);
          }
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch((error) => {
          setError("Something went wrong!");
        })
    });
  };

  return (
    <CardWrapper 
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {showTwoFactor && 
              <FormField control={form.control} name="code" render={({ field }) => (
                <FormItem>
                  <FormLabel>2FA Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter your 2FA code received from email' disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )} />}
            {!showTwoFactor && 
            <>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='youremail@gmail.com' type='email' disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type='password' disabled={isPending}/>
                  </FormControl>
                  <Button size={"sm"} variant="link" className='px-0 font-normal' asChild>
                    <Link href="/auth/reset-password-request">
                      Forget your password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )} />
            </>}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full' disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
