"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { account } from "@/appwrite.js";
import { AppwriteException, ID } from "appwrite";
import LogoutForm from "./LogoutForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

const RegisterForm: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

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

  const register = async () => {
    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const login = async (email: string, password: string): Promise<void> => {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());

    // Navigate to the home page
    router.push("/reservar");
  };

  const logOut = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <LogoutForm logout={logOut} loggedInUser={loggedInUser} />
    );
  }

  return (
    <form className={styles["login-form"]}>
      <h1>Regístrate</h1>
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
        type="password"
        placeholder="Repetir contraseña"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className={styles["email-input"]}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles["email-input"]}
      />
      <button type="button" onClick={() => register()}>
        Registrarse
      </button>
      <p className={styles["register-link"]}>
        ¿Ya tienes cuenta?&nbsp;
        <Link href="/login">
          Inicia Sesión
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;