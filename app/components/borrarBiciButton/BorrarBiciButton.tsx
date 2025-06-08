"use client";

import { deleteBicycle } from "@/actions";
import { useState } from "react";
import styles from "./BorrarBiciButton.module.css";
import { Bicycle } from "@/models/Bicycle";

export default function BorrarBiciButton({ bicycle, handleDelete }: { bicycle: Bicycle, handleDelete: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteBiclycle = () => {
    setIsLoading(true);

    deleteBicycle(bicycle).then(() => {
      handleDelete();
      setIsLoading(false);
    });
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => {
        const confirmCancel = window.confirm("¿Estás seguro de que quieres borrar la bicicleta?");
        if (confirmCancel) {
          handleDeleteBiclycle();
        }
      }}
      className={styles.customButton}
    >
      Borrar bicicleta
    </button>
  );
}