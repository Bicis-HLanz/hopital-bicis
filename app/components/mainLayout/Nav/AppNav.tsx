import React from "react";
import styles from "./AppNav.module.css";
import Link from "next/link";

const AppNav: React.FC = () => {
  return (
    <nav className={styles["app-nav"]}>
      <ul>
        <li>
          <Link href="/reservar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles["icono"]}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/reservas">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles["icono"]}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Tus Reservas
          </Link>
        </li>
        <li>
          <Link href="/gestionar">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M480-463.08q-50.38 0-84.71-34.32-34.32-34.32-34.32-84.7 0-50.39 34.32-84.71 34.33-34.32 84.71-34.32 50.38 0 84.71 34.32 34.32 34.32 34.32 84.71 0 50.38-34.32 84.7-34.33 34.32-84.71 34.32Zm0-33.84q36.46 0 60.82-24.36t24.36-60.82q0-36.46-24.36-60.82T480-667.28q-36.46 0-60.82 24.36t-24.36 60.82q0 36.46 24.36 60.82T480-496.92Zm0 375.23q-120.69-36.28-200.35-147.27Q200-379.95 200-518.1v-214.36l280-104.62 280 104.62v214.36q0 138.15-79.65 249.14Q600.69-157.97 480-121.69Zm0-357.54Zm0-321.98-246.15 92v191.11q0 62.56 18.59 120.46 18.59 57.9 52.18 106.33 40.56-21.36 83.59-32.92 43.02-11.56 91.79-11.56t91.79 11.56q43.03 11.56 83.59 32.92 33.59-48.43 52.18-106.33 18.59-57.9 18.59-120.46v-191.11l-246.15-92Zm0 499.26q-42.36 0-81.36 9.59T325-265.03q31.51 37.95 70.51 65.39 39 27.44 84.49 41.95 45.49-14.51 84.1-41.95 38.62-27.44 70.13-65.39-34.64-17.74-73.26-27.33-38.61-9.59-80.97-9.59Z" /></svg>
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;