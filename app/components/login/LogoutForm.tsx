import styles from './LogoutForm.module.css';
import { useEffect, useRef } from 'react';
import Image from "next/image";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function LogoutForm({
  logout,
  loggedInUser,
}: {
  logout: () => void;
  loggedInUser: User;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.opacity = '0';
      formRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          formRef.current.style.opacity = '1';
          formRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <form ref={formRef} className={styles.container}>
      <div className={styles.userProfile}>
        {loggedInUser.avatar ? (
          <Image
            src={loggedInUser.avatar} 
            alt={loggedInUser.name} 
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {loggedInUser.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{loggedInUser.name}</h2>
          <p className={styles.userEmail}>{loggedInUser.email}</p>
        </div>
      </div>

      <h1 className={styles.title}>¿Qué te gustaría hacer?</h1>
      
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => window.location.href = '/reservar'}
          className={`${styles.button} ${styles.reserveButton}`}
        >
          Ver bicis
        </button>
        
        <button 
          type="button" 
          onClick={logout}
          className={`${styles.button} ${styles.logoutButton}`}
        >
          Cerrar sesión
        </button>
      </div>
    </form>
  );
}