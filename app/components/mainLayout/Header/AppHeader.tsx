import React from "react";
import styles from "./AppHeader.module.css";
import Link from "next/link";
import Image from 'next/image';

const AppHeader: React.FC = () => {
  return (
    <header className={styles["app-header"]}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo Bicis Hlanz"
          width={30}
          height={30}
          className={styles["logo"]}
        />
        <h1>Bicis Hlanz</h1>
      </Link>
    </header>
  );
};

export default AppHeader;
