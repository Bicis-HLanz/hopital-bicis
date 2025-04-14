import React from "react";
import Link from "next/link";
import styles from "./404.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;