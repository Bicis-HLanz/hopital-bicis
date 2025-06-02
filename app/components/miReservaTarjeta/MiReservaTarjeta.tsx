import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import TarjetaReserva from "./TarjetaReserva";
import { createSessionClient } from '@/appwriteServer';

export default async function MiReservaTarjeta() {
    const documents = await fetchReservas();

    if (!documents || documents.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No tienes reservas aún</h3>
                <p>Explora nuestras bicicletas y haz tu primera reserva</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {documents.map((doc) => (
                    <li key={doc.$id}>
                       <TarjetaReserva doc={doc} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

async function fetchReservas() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;

  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents as Models.Document[];
}