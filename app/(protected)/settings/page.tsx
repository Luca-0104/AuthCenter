"use client";

import { signOut, useSession } from "next-auth/react";

const Settings = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      // there is a weird bug, if we do not reload the page, the session can not be get, but the session is indeed already in the cookies of the browser
      location.reload();
    }
  });
  
  const onClick = () => {
    signOut();
  };

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <button onClick={onClick} >
        sign out
      </button>
    </div>
  )
}

export default Settings;