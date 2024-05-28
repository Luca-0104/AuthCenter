"use client";

import ErrorCard from "@/components/auth/error-card"
import { useSearchParams } from "next/navigation"

const AuthError = () => {
  // get the type of error from the url
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already used with another provider!" : "This is an Error!";


  return (
    <ErrorCard errorMessage={urlError} />
  )
}

export default AuthError