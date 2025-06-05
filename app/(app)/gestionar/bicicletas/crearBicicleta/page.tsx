'use client';

import { useActionState, useState } from "react";
import styles from "./page.module.css";
import { createBicycle } from "@/actions";

export default function CrearBicicletaPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const initialState = {
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    createBicycle,
    initialState
  );

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Crear Bicicleta</h1>
      <form className={styles.form} action={formAction}>
        <label className={styles.label}>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={30}
            name="name"
            id="name"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={300}
            name="description"
            id="description"
            className={styles.textarea}
          />
        </label>

        <label className={styles.label}>
          Foto:
          <input
            type="file"
            accept="image/*"
            name="photo"
            id="photo"
            className={styles.inputFile}
          />
        </label>
        
        {state?.message.includes("error") && <p className={styles.errorMessage}>{state.message}</p>}
        {state?.message.includes("éxito") && <p className={styles.successMessage}>{state.message}</p>}
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.createButton}
            disabled={pending}
          >
            {pending ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
