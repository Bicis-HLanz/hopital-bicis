"use client";

import Link from "next/link";
import Image from 'next/image';
import styles from "./MobileBurger.module.css";
import { useState } from "react";

export default function MobileBurger() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                    <Link href="/cuenta" className={styles["mobile-link"]} onClick={toggleMenu}>
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
        </>
    )
}