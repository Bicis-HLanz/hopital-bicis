import BicisList from "@/components/tarjetaBici/BicisList";
import styles from "./page.module.css";
import { createSessionClient } from "@/appwriteServer";
import { Bicycle } from "@/models/Bicycle";
import { Query } from "node-appwrite";
import Reserva from "@/models/Reserva";

export default async function ReservarPage() {
  const { bicycles, reservations } = await fetchBicyclesAndReservas();

  return (
    <div className={styles["grid-container"]}>
      <BicisList bicycles={bicycles} reservas={reservations} />
    </div>
  );
}

async function fetchBicyclesAndReservas() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const bicycleCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
  const reservationCollectionId =
    process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;

  const bicycles = await databases.listDocuments(
    databaseId,
    bicycleCollectionId
  );
  const reservations = await databases.listDocuments(
    databaseId,
    reservationCollectionId,
    [
      Query.greaterThanEqual("from", new Date().toISOString()),
      Query.notEqual("status", "cancelled"),
      Query.orderAsc("$updatedAt"),
    ]
  );

  return {
    bicycles: bicycles.documents as Bicycle[],
    reservations: reservations.documents as Reserva[],
  };
}
