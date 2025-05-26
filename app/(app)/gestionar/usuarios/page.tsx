import { users } from "@/appwriteServer";
import VetarButton from "@/components/vetarButton/VetarButton";
import styles from './page.module.css';

export const dynamic = "force-dynamic";

export default async function Page() {
  const usersListResponse = await users.list();
  const usersList = usersListResponse.users;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Usuarios</h1>
      
      <div className={styles.usersList}>
        {usersList.map((user) => (
          <div key={user.$id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <VetarButton userId={user.$id} className={styles.customButton} />
          </div>
        ))}
      </div>
    </div>
  );
}