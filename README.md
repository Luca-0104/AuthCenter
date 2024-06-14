## Auth Center
This is my Auth Center developed using **Next.js 14** and **Next-auth v5 (Auth.js)**, which provides the main functionalities of credential login and logging in with **OAuth** providers (currently supported oAuth providers: Google, Github). Other functionalities like Two-factor verification (2FA), Email verification, Access control, User settings, etc are also provided.

In terms of techs, the whole project was built using **Next.js 14** with **TypeScript**, where I used **PostgreSQL** on the cloud as the database and **Prisma** as the ORM modeling tool for the database. The backend server logics were developed using **Next.js server actions** and the front-end was designed with **React.js**, **ShadcnUI**, and **TailWind CSS**. **Next-auth v5 (Auth.js)** was used to develop the functionality of logging in with third-party OAuth providers.

The project is deployed on **Vercel**, here is a [live demo](https://auth.liuzhelucas.com/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Main Features
1. Login with Credentials Provider
2. Login with OAuth Provider (currently supported OAuth providers: Google, Github)
3. Forgot password functionality
4. Email verification
5. Two-factor verification (2FA)
6. Access control with two user roles (Admin & User)
7. Route access control with next.js middleware
8. Accessing user session from both server and client side (next-auth session)
9. Implemented the next-auth callbacks of signIn, session, jwt, etc.
10. User info page developed with the server component
11. User info page developed with the client component
12. Render content for admins using RoleGate component
13. Protect API Routes for admins only
14. Protect Server Actions for admins only
15. Change email with new verification in the Settings page
16. Change password with old password confirmation in the Settings page
17. Enable/disable two-factor auth in the Settings page
18. Change user role in Settings page

## Key Technologies Adopted
1. Next.js 14
2. TypeScript
3. Next-auth v5 (Auth.js)
4. Next.js Server Actions
5. OAuth Authentications (Google, Github)
6. PostgreSQL
7. Prisma
8. TailWind CSS
9. Shadcn UI components
10. Node.js
11. Email verification with "Resend" platform
12. Next.js middleware
13. Next-auth session
14. Customized hooks (currentUser, useCurrentUser, currentRole, useCurrentRole, etc.)
15. Vercel for deployment
