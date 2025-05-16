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

  const reservar = async (): Promise<void> => {
    try {
      await createReserva(from, to, bicycle.$id);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
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
        />
        <label className={styles.formLabel} htmlFor="to">
          Fecha de fin
        </label>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button type="button" className={styles.submitButton} onClick={reservar}>
        Reservar
      </button>
    </form>
  );
}
