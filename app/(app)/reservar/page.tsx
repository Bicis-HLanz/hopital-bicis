'use client';

import TarjetaBici from '@/components/tarjetaBici/BicisList';
import styles from "./page.module.css";

const ReservarPage = () => {
  return (
    <div className={styles["grid-container"]}>
      <TarjetaBici></TarjetaBici>
    </div>
  );
};

export default ReservarPage;