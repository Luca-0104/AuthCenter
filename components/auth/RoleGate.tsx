"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";

interface Props {
  children: React.ReactNode,
  allowedRole: UserRole,
}

export const RoleGate = ({children, allowedRole}: Props) => {
  const role = useCurrentRole();
  
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to access!" />
    )
  }

  return (
    <>
      { children }
    </>
  )
}
