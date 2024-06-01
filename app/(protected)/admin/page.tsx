import { currentRole } from '@/lib/auth';

const AdminPage = async () => {
  const role = await currentRole();

  return (
    <div>AdminPage {role}</div>
  )
}

export default AdminPage