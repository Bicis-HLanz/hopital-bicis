"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import { account } from "@/appwrite";
import Link from "next/link";
import { AppwriteException } from "appwrite";
import LogoutForm from "./LogoutForm";

interface User {
  name: string;
  email: string;
}

const LoginForm: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Check if the user is already logged in
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user as User);
      } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
          // User is not logged in
          setLoggedInUser(null);
        } else {
          console.error("Error checking session:", error);
        }
      }
    };

    checkSession();
  }, []);

  const logIn = async (email: string, password: string): Promise<void> => {
    setError(null);
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      await account.createEmailPasswordSession(email, password);
    } catch (error) {
      if (error instanceof AppwriteException) {
        switch (error.type) {
          case "user_invalid_credentials":
            setError(
              "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña."
            );
            break;
          case "general_argument_invalid":
            setError("la contraseña debe tener entre 8 y 255 caracteres");
            break;
          case "general_rate_limit_exceeded":
            setError("Se ha excedido el límite de intentos. Por favor, inténtalo más tarde.");
            break;
          default:
            setError("Error inesperado: " + error.type + " " + error.message + " por favor reporta el error al administrador");
            break;
        }
      } else {
        setError("Error inesperado: " + error);
      }
      return;
    }

    setLoggedInUser((await account.get()) as User);

    //add session cookie
    document.cookie = `session=${await account.getSession("current").then(session => session.$id)}; path=/; secure; samesite=strict`;

    //navigate to the home page
    router.push("/reservar");
  };

  const logOut = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return <LogoutForm logout={logOut} loggedInUser={loggedInUser} />;
  }

  return (
    <form className={styles["login-form"]} onSubmit={(e) => {
      e.preventDefault();
      logIn(email, password);
    }}>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles["email-input"]}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles["email-input"]}
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      <button type="submit">
        Iniciar Sesión
      </button>
      <p className={styles["register-link"]}>
        ¿No tienes cuenta aún?&nbsp;
        <Link href="/register">Regístrate</Link>
      </p>
    </form>
  );
};

export default LoginForm;
