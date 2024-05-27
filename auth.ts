import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { db } from "./lib/db"


export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    session({ session, token }) {
      // get user id and role from token
      // then add them into session
      // therefore, they can be accessed from anywhere else
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    jwt({ token, user }) {
      // add user id and role into the token
      if (!user || !token || !token.sub) return token;
      token.role = user.role;
      token.sub = user.id;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})