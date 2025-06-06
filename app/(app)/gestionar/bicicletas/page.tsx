import { createSessionClient } from "@/appwriteServer"
import { Bicycle } from "@/models/Bicycle"
import styles from "./page.module.css";
import Link from "next/link";
import ListaTarjetas from "@/components/gestionarBicicletas/ListaTarjetas";

export default async function Page() {
  const bicyclesList = await fetchBicycles();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bicicletas</h1>
      <ListaTarjetas documents={bicyclesList} />
      <Link href="/gestionar/bicicletas/crearBicicleta" className={styles.botonflotante}>Crear Bicicleta</Link>
    </div>
  );
}

async function fetchBicycles() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.listDocuments(
    databaseId,
    collectionId
  );
  return response.documents as Bicycle[];
}
