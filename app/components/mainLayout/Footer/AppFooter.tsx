import React from "react";
import styles from "./AppFooter.module.css";

const AppFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Hospital Bicis. All rights reserved.
        </p>
        <p className={styles.text}>
          Designed and developed with ❤️ by Cristina Díaz Cabello and Darío Peregrín Alconchel.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;