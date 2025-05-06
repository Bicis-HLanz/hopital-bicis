import React from "react";
import styles from "./AppNav.module.css";
import Link from "next/link";

const AppNav: React.FC = () => {
  return (
    <nav className={styles["app-nav"]}>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/mi-reserva">Tus Reservas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
