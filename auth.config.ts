import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default { providers: [
  Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const {email, password} = validatedFields.data;
        const user = await getUserByEmail(email);

        // if user registered using github or google, they do not have password
        if (!user || !user.password) return null;

        // check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return user;
      }

      return null;
    }
  })
] } satisfies NextAuthConfig