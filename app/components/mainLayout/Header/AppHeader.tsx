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
            width={40}
            height={40}
            className={styles["logo"]}
          />
          <Image
            src="/logoEscrito.png"
            alt="Bicis Hlanz"
            width={150}
            height={35}
            className={styles["logo"]}
          />
        </Link>
      </div>
      
      <div className={styles["header-right"]}>
        <Link href="/documentacion" className={styles["icon-link"]}>
          <Image
            src="/info.png" 
            alt="Perfil Usuario"
            width={30}
            height={30}
            className={styles["icon"]}
          />
        </Link>
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