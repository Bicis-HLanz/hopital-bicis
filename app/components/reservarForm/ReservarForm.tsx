"use client";

import { useState } from "react";
import styles from "./ReservarForm.module.css";
import { createReserva } from "@/appwrite";
import { Models } from "appwrite";

export default function ReservarForm({
  bicycle,
}: {
  bicycle: Models.Document;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reservar = async (): Promise<void> => {
    if (!from || !to) {
      setError("Por favor, completa ambas fechas");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      await createReserva(from, to, bicycle.$id);
      setSuccess("¡Reserva realizada con éxito!");
      setFrom("");
      setTo("");
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="datetime-local"
          id="from"
          name="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder=" "
          disabled={isSubmitting}
        />
        <label className={styles.formLabel} htmlFor="from">
          Fecha de inicio
        </label>
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="datetime-local"
          id="to"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder=" "
          disabled={isSubmitting}
        />
        <label className={styles.formLabel} htmlFor="to">
          Fecha de fin
        </label>
      </div>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}
      
      <button 
        type="button" 
        className={styles.submitButton} 
        onClick={reservar}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Reservar"}
      </button>
    </form>
  );
}