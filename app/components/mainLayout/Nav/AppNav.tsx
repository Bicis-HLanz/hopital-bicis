import React from "react";
import styles from "./AppNav.module.css";
import Link from "next/link";

const AppNav: React.FC = () => {
  return (
    <nav className={styles["app-nav"]}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/reserva">Reserva</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
