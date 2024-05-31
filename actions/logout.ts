"use server";

// a fucking bug with this!
import { signOut } from "@/auth";

// import { signOut } from "next-auth/react";



export const logout = async () => {
  await signOut();
}