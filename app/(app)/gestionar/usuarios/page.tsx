import { users } from "@/appwriteServer";
import ClientUserList from "./ClientUserList";
import styles from './page.module.css';

export const dynamic = "force-dynamic";

export default async function Page() {
  const usersListResponse = await users.list();
  const usersList = usersListResponse.users;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Usuarios</h1>
      <ClientUserList users={usersList} />
    </div>
  );
}
