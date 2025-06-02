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
      {}
      <header className={styles.header}>
        <div className={styles["logo-container"]}>
          <Image
            src="/logo.png"
            alt="logo"
            width={38}
            height={38}
            priority
          />
          <Image
            src="/logoEscrito.png"
            alt="logo Hospital Bikes"
            width={160}
            height={34}
            priority
            className={styles["text-logo"]}
          />
        </div>

        {}
        <div className={styles["header-right"]}>
          <Link href="/documentacion" className={styles["icon-link"]} aria-label="Documentación">
            <Image
              src="/info.png" 
              alt=""
              width={30}
              height={30}
            />
          </Link>
          <Link href="/login" className={styles["icon-link"]} aria-label="Iniciar sesión">
            <Image
              src="/userIcon.png" 
              alt=""
              width={35}
              height={35}
            />
          </Link>
        </div>

        {}
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

          {}
          {isMenuOpen && (
            <div className={styles["mobile-dropdown"]}>
              <Link 
                href="/documentacion" 
                className={styles["mobile-link"]} 
                onClick={toggleMenu}
              >
                <Image
                  src="/info.png" 
                  alt="Documentación"
                  width={20}
                  height={20}
                />
                <span>Documentación</span>
              </Link>
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
      
      {}
      <div className={styles.squareGrid} />
      
      {}
      <main className={styles.children}>
        {children}
      </main>
    </div>
  );
}