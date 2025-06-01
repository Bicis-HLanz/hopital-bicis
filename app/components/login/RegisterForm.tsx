"use client";

import styles from "@/components/login/RegisterForm.module.css";
import Link from "next/link";
import { useActionState } from "react";

import { signUpWithEmail } from "@/actions";


const initialState = {
  message: '',
}


export default function RegisterForm() {
    const [state, formAction, pending] = useActionState(signUpWithEmail, initialState)


  return (
    <form className={styles["login-form"]} action={formAction}>
      <h1>Regístrate</h1>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Correo electrónico"
        className={styles["email-input"]}
        required
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Contraseña"
        className={styles["email-input"]}
        required
      />
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="Repetir contraseña"
        className={styles["email-input"]}
        required
      />
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nombre"
        className={styles["email-input"]}
        required
      />

      {state?.message && <p className={styles["error-message"]}>{state.message}</p>}

      <button type="submit" disabled={pending}>Registrarse</button>
      <p className={styles["register-link"]}>
        ¿Ya tienes cuenta?&nbsp;
        <Link href="/login">Inicia Sesión</Link>
      </p>
    </form>
  );
}