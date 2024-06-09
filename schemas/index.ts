import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),

}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }
  return true;
}, {
  message: "New password is required!",
  path: ["newPassword"],
  
}).refine((data) => {
  if (data.newPassword && !data.password) {
    return false;
  }
  return true;
}, {
  message: "Old password is required!",
  path: ["password"],
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "New password should longer than 6 characters"
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  }),
  password: z.string().min(6, {
    message: "Password should longer than 6 characters"
  }),
});