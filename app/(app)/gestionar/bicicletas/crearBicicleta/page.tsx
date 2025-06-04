'use client';

import { useState } from "react";
import { databases, storage } from "@/appwriteServer";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CrearBicicletaPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileId = "";
      if (imageFile) {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          imageFile
        );
        fileId = file.$id;
      }

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        ID.unique(),
        {
          name,
          description,
          image: fileId,
        }
      );

      router.push("/bicicletas");
    } catch (error) {
      console.error("Error al crear bicicleta:", error);
      alert("Error al crear la bicicleta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Crear Bicicleta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </label>

        <label className={styles.label}>
          Foto:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputFile}
          />
        </label>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.createButton}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/bicicletas")}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
