"use client";

import React, { useState } from "react";
import styles from "./AppHeader.module.css";
import Link from "next/link";
import Image from 'next/image';

const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles["app-header"]}>
      <div className={styles["header-left"]}>
        <Link href="/" className={styles["logo-link"]}>
          <Image
            src="/logo.png"
            alt="Logo Bicis Hlanz"
            width={40}
            height={40}
            className={styles["logo"]}
          />
          <Image
            src="/logoEscrito.png"
            alt="Bicis Hlanz"
            width={150}
            height={35}
            className={styles["logo"]}
          />
        </Link>
      </div>
      
      {/* Menú normal para desktop */}
      <div className={styles["header-right"]}>
        <Link href="/documentacion" className={styles["icon-link"]}>
          <Image
            src="/info.png" 
            alt="Documentación"
            width={30}
            height={30}
            className={styles["icon"]}
          />
        </Link>
        <Link href="/login" className={styles["icon-link"]}>
          <Image
            src="/userIcon.png" 
            alt="Perfil Usuario"
            width={35}
            height={35}
            className={styles["icon"]}
          />
        </Link>
      </div>

      {/* Menú hamburguesa para móvil */}
      <div className={styles["mobile-menu"]}>
        <button 
          className={styles["hamburger"]} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line1"] : ""}`}></div>
          <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line2"] : ""}`}></div>
          <div className={`${styles["hamburger-line"]} ${isMenuOpen ? styles["line3"] : ""}`}></div>
        </button>

        {isMenuOpen && (
          <div className={styles["mobile-dropdown"]}>
            <Link href="/documentacion" className={styles["mobile-link"]} onClick={toggleMenu}>
              <Image
                src="/info.png" 
                alt="Documentación"
                width={24}
                height={24}
                className={styles["mobile-icon"]}
              />
              <span>Documentación</span>
            </Link>
            <Link href="/login" className={styles["mobile-link"]} onClick={toggleMenu}>
              <Image
                src="/userIcon.png" 
                alt="Perfil Usuario"
                width={24}
                height={24}
                className={styles["mobile-icon"]}
              />
              <span>Tu cuenta</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;