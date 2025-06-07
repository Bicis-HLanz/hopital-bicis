"use client";
import { createVerficationMail } from "@/appwriteServer";
import { Client, Account } from "appwrite";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from './page.module.css';

export default function VerificarPage() {
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const account = new Account(client);

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (!secret || !userId) {
      setVerificationStatus("error");
      setErrorMessage("Hemos mandado un email de verificación! Comprueba tu bandeja de entrada para verificar tu cuenta.");
      return;
    }

    account.updateVerification(userId, secret).then(
      function () {
        setVerificationStatus("success");
      },
      function (error) {
        setVerificationStatus("error");
        setErrorMessage("Error al verificar la cuenta: " + error.message);
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {verificationStatus === "loading" && (
          <div className={styles.statusContainer}>
            <div className={styles.spinner}></div>
            <h1 className={styles.title}>Verificando tu cuenta</h1>
            <p className={styles.message}>Estamos confirmando tus datos. Por favor, espera un momento.</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className={styles.statusContainer}>
            <div className={`${styles.iconContainer} ${styles.success}`}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4 12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className={styles.title}>¡Verificación exitosa!</h1>
            <p className={styles.message}>Tu cuenta ha sido verificada correctamente.</p>
            <Link href="/login" className={styles.primaryButton}>
              Ir al inicio de sesión
            </Link>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className={styles.statusContainer}>
            <div className={`${styles.iconContainer} ${styles.error}`}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className={styles.title}>Verifícate.</h1>
            <p className={styles.message}>
              {errorMessage || "Ha ocurrido un error durante la verificación de tu cuenta."}
            </p>
            <div className={styles.buttonGroup}>
              <button 
                onClick={async () => await createVerficationMail()} 
                className={styles.secondaryButton}
              >
                Reenviar email de verificación
              </button>
              <Link href="/cuenta" className={styles.primaryButton}>
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}