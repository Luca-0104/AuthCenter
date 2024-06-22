## Auth Center
<img width="1511" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/4e014b67-9728-4881-aa88-a376d8c2eb46">


This is my Auth Center developed using **Next.js 14** and **Next-auth v5 (Auth.js)**, which provides the main functionalities of credential login and logging in with **OAuth** providers (currently supported oAuth providers: Google, Github). Other functionalities like Two-factor verification (2FA), Email verification, Access control, User settings, etc are also provided.

In terms of techs, the whole project was built using **Next.js 14** with **TypeScript**, where I used **PostgreSQL** on the cloud as the database and **Prisma** as the ORM modeling tool for the database. The backend server logics were developed using **Next.js server actions** and the front-end was designed with **React.js**, **ShadcnUI**, and **TailWind CSS**. **Next-auth v5 (Auth.js)** was used to develop the functionality of logging in with third-party OAuth providers.

The project is deployed on **Vercel**, here is a [live demo](https://auth.liuzhelucas.com/).


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


## Getting Started

Make sure the node.js version is >= 20.x

Install dependencies:
```bash
npm install
```

Generate database tables based on the Prisma models:
```bash
npx prisma generate
```
Then sync the database
```bash
npx prisma db push
```

Run the development server:
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
   - <img width="390" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/49b7b82b-e0c0-4966-a7ac-c3cbc78f2ecb">

3. Login with OAuth Provider (currently supported OAuth providers: Google, Github)
   - <img width="372" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/4309242f-45da-4a5c-b5ec-1c7d5da31383">

5. Forgot password functionality
   - <img width="417" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/ebd4462a-4eef-48de-949c-95d79cbd4fe8">
   - <img width="509" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/69b79057-5842-4bac-90b6-9d68050817c1">
   - <img width="423" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/d81bb5e3-c43b-4bd5-8f9b-34c56dc49060">

7. Email verification
   - <img width="429" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/9d6f91e9-bb10-4c96-b504-8782fa131b0e">
   - <img width="492" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/3c6d30b1-7648-494f-a702-9924fde11885">

9. Two-factor verification (2FA)
    - <img width="416" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/b881840c-1218-42ae-b574-f934660980e5">
    - <img width="463" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/d2d72104-b6fa-4c81-877c-a19d35e2bd2b">

11. Access control with two user roles (Admin & User)
12. Route access control with next.js middleware
13. Accessing user session from both server and client side (next-auth session)
15. Implemented the next-auth callbacks of signIn, session, jwt, etc.
16. User info page developed with the server component
    - <img width="636" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/f2694c05-4b91-42b6-bf66-25cf728b78f0">

18. User info page developed with the client component
    - <img width="624" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/aba05864-914f-4331-9b4c-cd3be6c45dab">

20. Render content for admins using RoleGate component
    - <img width="628" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/1717f0fa-881b-436c-840a-a0eed270600f">

22. Protect API Routes for admins only
    - <img width="397" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/5f3b968b-ff9b-486e-a162-0ded5849e610">

24. Protect Server Actions for admins only
    - <img width="389" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/f6d2e151-5e4d-4e71-a927-94b1ee4db82e">

26. Change email with new verification in the Settings page
27. Change password with old password confirmation in the Settings page
28. Enable/disable two-factor auth in the Settings page
29. Change the user role in the Settings page
    - <img width="632" alt="image" src="https://github.com/Luca-0104/AuthCenter/assets/61484990/4c1281e2-176a-479a-8edc-c7c355ae972e">
