import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  // ever single route except the following will invoke the middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
