"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import { account } from "../../appwrite.js";
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
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get() as User);
    
    //navigate to the home page
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
      <button type="button" onClick={() => logIn(email, password)}>
        Iniciar Sesión
      </button>
      <p className={styles["register-link"]}>
        ¿No tienes cuenta aún?
        <Link href="/registro">
          Regístrate
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;