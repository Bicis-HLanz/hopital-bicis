"use client";

import { useState } from "react";
import styles from "./ReservarForm.module.css";
import { createReserva} from "@/appwrite";
import { Models } from "appwrite";

export default function ReservarForm({ bicycle }: { bicycle: Models.Document }) {
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
    <form className={styles["form"]}>
      <div>
        <label htmlFor="from">from:</label>
        <input
          type="datetime-local"
          id="from"
          name="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="to">to:</label>
        <input
          type="datetime-local"
          id="to"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        ></input>
      </div>
      {error && <p className={styles["error"]}>{error}</p>}
      <button type="button" onClick={reservar}>Reservar</button>
    </form>
  );
}
