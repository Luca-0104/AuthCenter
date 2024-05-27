/**
 * Routes starts with this are for authentication, we do not block them
 * @type {string}
 */
export const apiRoutePrefix = "/api/auth";

/**
 * Public routes that do not require user authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/"
];

/**
 * routes for authentication, authenticated users cannot access, rather they should
 * be redirected to the /setting
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
];

/**
 * The redirect route after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"