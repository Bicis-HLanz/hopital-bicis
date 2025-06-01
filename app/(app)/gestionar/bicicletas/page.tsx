import { createSessionClient } from "@/appwriteServer"
import { Bicycle } from "@/models/Bicycle"
import Image from "next/image";
import styles from "./page.module.css";
import { getBycicleImage } from "@/appwrite";

export default async function Page() {
  const bicyclesList = await fetchBicycles();

   return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bicicletas</h1>
      <div className={styles.usersList}>
        {bicyclesList.map((bicycle) => (
          <div key={bicycle.$id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <Image
                src={getBycicleImage(bicycle)}
                alt={bicycle.name}
                width={200}
                height={100}
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

async function fetchBicycles() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents as Bicycle[];
}
