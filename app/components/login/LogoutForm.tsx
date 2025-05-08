import styles from './LogoutForm.module.css';

interface User {
  name: string;
  email: string;
}

export default function LogoutForm({
  logout,
  loggedInUser,
}: {
  logout: () => void;
  loggedInUser: User;
}) {
  return (
    <form className={styles.container}>
      <h1 className={styles.title}>Usuario: {loggedInUser.name}</h1>
      <p className={styles.message}>¿Quieres cerrar sesión?</p>
      <button 
        type="button" 
        onClick={logout}
        className={styles.button}
      >
        Cerrar sesión
      </button>
    </form>
  );
}