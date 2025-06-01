"use client";
import { useActionState } from "react";
import styles from "./ReservarForm.module.css";
import { createReserva } from "@/actions";
import { Models } from "appwrite";

const initialState = {
  message: "",
};

export default function ReservarForm({
  bicycle,
  userID,
}: {
  bicycle: Models.Document;
  userID: string;
}) {

  const [state, formAction, pending] = useActionState(
    async (prevState: { message: string }, formData: FormData) => {
      return createReserva(prevState, bicycle.$id, userID, formData);
    },
    initialState
  );

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="datetime-local"
          id="from"
          name="from"
          placeholder=" "
          required
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
          placeholder=" "
          required
        />
        <label className={styles.formLabel} htmlFor="to">
          Fecha de fin
        </label>
      </div>
      {state?.message && <p className={styles.errorMessage}>{state.message}</p>}
      <button type="submit" className={styles.submitButton} disabled={pending}>
        Reservar
      </button>
    </form>
  );
}
