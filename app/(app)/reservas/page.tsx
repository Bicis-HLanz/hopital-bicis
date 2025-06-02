import MiReservaTarjeta from "@/components/miReservaTarjeta/MiReservaTarjeta";
import styles from "./page.module.css";
import { createSessionClient, getLoggedInUser } from "@/appwriteServer";
import { Models, Query } from "node-appwrite";
import { redirect } from "next/navigation";

export default async function ReservasPage() {
  const user = await getLoggedInUser();
  if (!user) {
    redirect("/login");
  }
  const userID = user.$id;
  const documents = await fetchReservas(userID);
  
  return (
    <main className={styles.container}>
      <section className={styles.children}>
        <MiReservaTarjeta documents={documents} />
      </section>
    </main>
  );
};

async function fetchReservas(userID: string) {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;


  const response = await databases.listDocuments(
    databaseId,
    collectionId,
    [Query.equal("userId", userID), Query.notEqual("status", "cancelled")]
  );
  return response.documents as Models.Document[];
}