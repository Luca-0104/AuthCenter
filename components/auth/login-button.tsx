"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from './login-form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { currentUser } from '@/lib/auth';


interface Props {
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  asChild?: boolean,
}

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();
  const user = useCurrentUser();

  const onClick = () => {
    router.push("/auth/login");
  }

  if (mode === "modal") {
    // if the user already logged in
    if (user) {
      return (
        <span onClick={onClick} className="cursor-pointer">
          {children}
        </span>
      )
    }
    // if not logged in
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          { children }
        </DialogTrigger>
        <DialogContent className='border-none p-0 w-auto bg-transparent'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton;