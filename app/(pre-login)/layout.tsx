"use client";

import React, { useState } from "react";
import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      { }
      <header className={styles.header}>
        <div className={styles["logo-container"]}>
          <Image
            src="/logo.png"
            alt="Logo Bicis Hlanz"
            width={40}
            height={40}
            >
          </Image>
          <Image
            src="/logoEscrito.png"
            alt="logo Hospital Bikes"
            width={150}
            height={35}
            priority
            className={styles["text-logo"]}
          />
        </div>

        { }
        <div className={styles["header-right"]}>
          <Link href="/login" className={styles["icon-link"]} aria-label="Iniciar sesión">
            <Image
              src="/userIcon.png"
              alt=""
              width={35}
              height={35}
            />
          </Link>
        </div>

        { }
        <div className={styles["mobile-menu"]}>
          <button
            className={`${styles["hamburger"]} ${isMenuOpen ? styles["open"] : ""}`}
            onClick={toggleMenu}
            aria-label="Menú"
            aria-expanded={isMenuOpen}
          >
            <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line1"] : ""}`}></div>
            <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line2"] : ""}`}></div>
            <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line3"] : ""}`}></div>
          </button>

          { }
          {isMenuOpen && (
            <div className={styles["mobile-dropdown"]}>
              <Link
                href="/login"
                className={styles["mobile-link"]}
                onClick={toggleMenu}
              >
                <Image
                  src="/userIcon.png"
                  alt="Iniciar sesión"
                  width={20}
                  height={20}
                />
                <span>Iniciar sesión</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      { }
      <div className={styles.squareGrid} />

      { }
      <main className={styles.children}>
        {children}
      </main>
    </div>
  );
}