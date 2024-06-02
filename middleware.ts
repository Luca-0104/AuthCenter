import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { apiRoutePrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth; // !! to convert it to bool

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  
  // allow all the api auth route
  if (isApiAuthRoute) return;

  // if already logged in, they should not access the auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // restrict the private page
  if (!isPublicRoute && !isLoggedIn) {
    // get the url that the user wants to access
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedUrl}`, nextUrl));
  }

  // public page or logged in
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // ever single route except the following will invoke the middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
