"use client";

import { useActionState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { logInWithEmail } from "@/actions";

const initialState = {
  message: "",
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    logInWithEmail,
    initialState
  );

  return (
    <form className={styles["login-form"]} action={formAction}>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        name="email"
        id="email"
        className={styles["email-input"]}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        name="password"
        id="password"
        className={styles["email-input"]}
        required
      />
      {state?.message && (
        <p className={styles["error-message"]}>{state.message}</p>
      )}
      <button type="submit" disabled={pending}>
        Iniciar Sesión
      </button>
      <p className={styles["register-link"]}>
        ¿No tienes cuenta aún?&nbsp;
        <Link href="/register">Regístrate</Link>
      </p>
    </form>
  );
}
