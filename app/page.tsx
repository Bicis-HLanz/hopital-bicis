"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "./appwrite.js";
import { AppwriteException } from "appwrite";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Intenta obtener la sesión actual del usuario
        await account.get();
        // Si la llamada anterior no lanza error, el usuario está autenticado
        router.push("/reservar");
      } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
          // Usuario no autenticado, redirigir a login
          router.push("/login");
        } else {
          // Otro tipo de error
          console.error("Error al verificar la autenticación:", error);
          // En caso de error, también redirigimos a login por seguridad
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <h1>Cargando...</h1>
          <p>Verificando estado de autenticación</p>
        </div>
      )}
    </div>
  );
}