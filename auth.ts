import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
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
    // user can still bypass our verification checking in the server actions, and just using the api
    // so the verification check should also be performed in the signIn call back (here) to prevent this.
    async signIn({ user, account, profile, email, credentials }) {
      // we allow OAuth login without email verification
      if (account?.provider !== "credentials") return true;
      // do not allow credential login without email verification
      const existingUser = await getUserById(user.id || "");
      if (!existingUser || !existingUser.emailVerified) return false;
      // add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        if (!existingTwoFactorConfirmation) return false;
        // if exist, we will delete it as it is used this time
        await db.twoFactorConfirmation.delete({
          where: { id: existingTwoFactorConfirmation.id }
        });
      }
      return true;
    },
    async session({ session, token }) {
      // get user id and role from token
      // then add them into session
      // therefore, they can be accessed from anywhere else
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      return session;
    },
    async jwt({ token, user }) {
      // add user id and role into the token
      if (!user || !token || !token.sub) return token;
      token.role = user.role;
      token.sub = user.id;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      return token;
    },
  },
})