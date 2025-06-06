import React from 'react';
import styles from './page.module.css';

const Vetado: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className={styles.title}>Acceso Restringido</h1>
        <p className={styles.message}>
          Tu cuenta ha sido vetada. Para más información, por favor contacta con el administrador del sistema.
        </p>
        <div className={styles.contactInfo}>
          <p>Teléfono: +34 636 099 994</p>
        </div>
      </div>
    </div>
  );
};

export default Vetado;