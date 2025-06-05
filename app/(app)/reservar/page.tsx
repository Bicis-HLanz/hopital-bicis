import BicisList from '@/components/tarjetaBici/BicisList';
import styles from "./page.module.css";
import { createSessionClient } from '@/appwriteServer';
import { Bicycle } from '@/models/Bicycle';

export default async function ReservarPage (){
  const bicycles = await fetchBicycles();

  return (
    <div className={styles["grid-container"]}>
      <BicisList bicycles={bicycles} />
    </div>
  );
};


async function fetchBicycles() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents as Bicycle[];
}
