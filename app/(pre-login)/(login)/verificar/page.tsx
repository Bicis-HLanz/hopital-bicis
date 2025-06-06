"use client";
import { createVerficationMail } from "@/appwriteServer";
import { Client, Account } from "appwrite";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      function (response) {
        console.log(response); // Success
        setVerificationStatus("success");
      },
      function (error) {
        console.log(error); // Failure
        setVerificationStatus("error");
        setErrorMessage("Error al verificar la cuenta: " + error.message);
      }
    );
  }, []);

  return (
    <div>
      {verificationStatus === "loading" && (
        <>
          <h1>Verificación en curso...</h1>
          <p>Por favor, espera mientras verificamos tu cuenta.</p>
        </>
      )}

      {verificationStatus === "success" && (
        <>
          <h1>¡Verificación exitosa!</h1>
          <p>Tu cuenta ha sido verificada correctamente.</p>
          <Link href="/login">Ir al inicio de sesión</Link>
        </>
      )}

      {verificationStatus === "error" && (
        <>
          <h1>Error de verificación</h1>
          <p>
            {errorMessage ||
              "Ha ocurrido un error durante la verificación de tu cuenta."}
          </p>
          <input onClick={async () => await createVerficationMail()} type="button" value="Reenviar email de verificacion" />
          <Link href="/login">Volver al inicio de sesión</Link>
        </>
      )}
    </div>
  );
}
