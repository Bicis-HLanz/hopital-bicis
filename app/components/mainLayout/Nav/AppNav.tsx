import React from "react";
import styles from "./AppNav.module.css";
import Link from "next/link";
import { getLoggedInUser } from "@/appwriteServer";

export default async function AppNav() {
  const user = await getLoggedInUser();

  const isAdmin = user?.labels?.includes("admin");

  return (
    <nav className={styles["app-nav"]}>
      <ul>
        <li>
          <Link href="/reservar">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={styles["icono"]}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/reservas">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={styles["icono"]}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Tus Reservas
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link href="/gestionar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={styles["icono"]}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
