import React from 'react';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <div className={styles.squareGrid} /> {/* ¡Cuadrados en movimiento! */}
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}