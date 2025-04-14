import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorSection}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Page Not Found</p>
        <p className={styles.message}>
        Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className={styles.link}>
          Take me back to safety
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