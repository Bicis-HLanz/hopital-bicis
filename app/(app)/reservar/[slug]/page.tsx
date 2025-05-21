'use client'

import { databases } from "@/appwriteServer";
import Image from "next/image";
import styles from "./page.module.css";
import ReservarForm from "@/components/reservarForm/ReservarForm";
import { getBycicleImage } from "@/appwrite";
import { Bicycle } from "@/models/Bicycle";
import React from "react";

export default function BiciDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

  const [bicycle, setBicycle] = React.useState<Bicycle | null>(null);

  if (!databaseId || !collectionId) {
    throw new Error("Database ID or Collection ID is not set");
  }

  React.useEffect(() => {
    const fetchBicycle = async () => {
      try {
        const response = await databases.getDocument<Bicycle>(
          databaseId,
          collectionId,
          slug
        );
        setBicycle(response);
      } catch (error) {
        console.error("Error fetching bicycle:", error);
      }
    }
    fetchBicycle();
  }, [slug, databaseId, collectionId]);

  if (!bicycle) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["reservar-grid"]}>
      <div className={styles["details"]}>
        <Image
          src={getBycicleImage(bicycle)}
          alt={bicycle.name}
          width={150}
          height={150}
        />

        <div className={styles["details1"]}>
          <h1>{bicycle.name}</h1>
          {bicycle.description && <p>{bicycle.description}</p>}
        </div>
      </div>

      <ReservarForm bicycle={bicycle} />
    </div>
  );
}
