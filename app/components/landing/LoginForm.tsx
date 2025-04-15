"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { account, ID } from "../../appwrite.js";

interface User {
  name: string;
  email: string;
}

const LoginForm: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Check if the user is already logged in
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user as User);
      } catch (error: any) {
        if (error.code === 401) {
          // User is not logged in, this is expected
          setLoggedInUser(null);
        } else {
          console.error("Unexpected error fetching user session:", error);
        }
      }
    };

    checkSession();
  }, []);

  const iniciarSesion = async (email: string, password: string): Promise<void> => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get() as User);
  };

  const registrar = async (): Promise<void> => {
    await account.create(ID.unique(), email, password, name);
    await iniciarSesion(email, password);
  };

  const cerrarSesion = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Sesión iniciada como {loggedInUser.name}</p>
        <button type="button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <form className={styles["login-form"]}>
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
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles["email-input"]}
      />
      <button type="button" onClick={() => iniciarSesion(email, password)}>
        Iniciar Sesión
      </button>
      <p className={styles["register-link"]}>
        ¿No tienes cuenta aún?{" "}
        <a href="./registo" onClick={registrar}>
          Regístrate
        </a>
      </p>
    </form>
  );
};

export default LoginForm;