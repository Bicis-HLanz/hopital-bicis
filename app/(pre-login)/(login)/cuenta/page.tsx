import {
  createSessionClient,
  getLoggedInUser,
} from "@/appwriteServer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from '@/components/login/LogoutForm.module.css';
import Link from "next/link";



async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/login");
}

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");

  return (
    <div className={styles.container}>
      <div className={styles.userProfile}>
        <div className={styles.avatarPlaceholder}>
            {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      <h1 className={styles.title}>¿Qué te gustaría hacer?</h1>

      <div className={styles.buttonGroup}>
        <Link
          href="/reservar"
          className={`${styles.button} ${styles.reserveButton}`}
        >
          Ver bicis
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className={`${styles.button} ${styles.logoutButton}`}
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}


