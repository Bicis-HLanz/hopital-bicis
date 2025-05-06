import React from "react";
import styles from "./AppHeader.module.css";
import Link from "next/link";
import Image from 'next/image';

const AppHeader: React.FC = () => {
  return (
    <header className={styles["app-header"]}>
      <div className={styles["header-left"]}>
        <Link href="/" className={styles["logo-link"]}>
          <Image
            src="/logo.png"
            alt="Logo Bicis Hlanz"
            width={35}
            height={35}
            className={styles["logo"]}
          />
          <h2>Hospital Bicis</h2>
        </Link>
      </div>
      
      <div className={styles["header-right"]}>
        
        <Link href="/login" className={styles["icon-link"]}>
          <Image
            src="/userIcon.png" 
            alt="Perfil Usuario"
            width={35}
            height={35}
            className={styles["icon"]}
          />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;