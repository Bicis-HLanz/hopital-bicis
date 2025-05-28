"use client";

import { useEffect, useState } from "react";
import { databases } from "@/appwriteServer";
import { Bicycle } from "@/models/Bicycle";
import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string
        );
        setBicycles(response.documents as Bicycle[]);
      } catch (error) {
        console.error("Error fetching bicycles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBicycles();
  }, []);

  const deleteBicycle = async (id: string) => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        id
      );

      setBicycles((prev) => prev.filter((bike) => bike.$id !== id));
    } catch (error) {
      console.error("Error deleting bicycle:", error);
    }
  };

  if (loading) return <p className={styles.title}>Cargando bicicletas...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bicicletas</h1>
      <div className={styles.usersList}>
        {bicycles.map((bicycle) => (
          <div key={bicycle.$id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <Image
                src={bicycle.imageUrl || "/placeholder.jpg"}
                alt={bicycle.name}
                width={400}
                height={250}
                className={styles.cardImage}
              />
              <h2 className={styles.userName}>{bicycle.name}</h2>
              <p className={styles.userId}>ID: {bicycle.$id}</p>
            </div>
            <button
              className={styles.customButton}
              onClick={() => deleteBicycle(bicycle.$id)}
            >
              Borrar bicicleta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
