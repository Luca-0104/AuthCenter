import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { db } from "./lib/db"


export const { auth, handlers, signIn, signOut } = NextAuth({
  // customize the route for auth errors
  pages: {
    signIn: "/auth/error", // this is fucking absurd! this is the route wil be redirected to after getting errors, even though the name of it is signIn
  },
  events: {
    // update the emailVerified for OAuth register
    // because google or github already verified their emails
    // this event function is only triggered when using OAuth first time creating an account
    async linkAccount({ user }){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    }
  },
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