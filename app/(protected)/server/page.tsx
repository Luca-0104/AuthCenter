import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';

/**
 * Fetch session on "server" side
 */
const ServerPage = async () => {
  const user = await currentUser();

  return (
    <UserInfo 
      user={user} 
      label={"🔞 Server Component ⚧"}
      description="Following data comes from the session fetched on the server side."/>
  )
};

export default ServerPage;