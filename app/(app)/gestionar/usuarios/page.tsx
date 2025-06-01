import { createAdminClient} from "@/appwriteServer";
import ClientUserList from "./ClientUserList";
import styles from './page.module.css';

export default async function Page() {
  const usersList = await fetchUsers();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Usuarios</h1>
      <ClientUserList users={usersList} />
    </div>
  );
}

async function fetchUsers() {
  const { users } = await createAdminClient();

  const response = await users.list();
  return response.users;
}