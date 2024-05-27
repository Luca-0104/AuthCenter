import { auth, signOut } from '@/auth';


const Settings = async () => {
  const session = await auth();

  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form action={async () => {
        "use server";
        // have to use redirectTo, there is a bug with auth.js or Response.redirect
        // if do not use redirectTo, it will render the login page but still remain the /settings url
        await signOut({redirectTo: "/auth/login"});
      }}>
        <button type='submit'>
          sign out
        </button>
      </form>
    </>

  )
}

export default Settings