import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorSection}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Página no encontrada</p>
        <p className={styles.message}>
        Ups! La página que estás buscando no existe.
        </p>
        <Link href="/" className={styles.link}>
          Llévame de vuelta al inicio 🚴🏿‍♀️
        </Link>
      </div>
      <div className={styles.animationSection}>
        <div className={styles.planet}></div>
        <div className={styles.astronaut}></div>
        <div className={styles.stars}></div>
      </div>
    </div>
  );
};

export default NotFoundPage;