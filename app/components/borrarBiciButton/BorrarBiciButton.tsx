"use client";

import { deleteBicycle } from "@/actions";
import { useState } from "react";
import styles from "./BorrarBiciButton.module.css";

export default function BorrarBiciButton({ bicycle }: { bicycle: { $id: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);

    deleteBicycle(bicycle.$id).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => {
        const confirmCancel = window.confirm("¿Estás seguro de que quieres borrar la bicicleta?");
        if (confirmCancel) {
          handleDelete();
        }
      }}
      className={styles.customButton}
    >
      Borrar bicicleta
    </button>
  );
}