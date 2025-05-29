import { createSessionClient, getLoggedInUser } from "@/appwriteServer";
import { redirect } from "next/navigation";
import BiciCard from "./BiciCard";
import { Bicycle } from "@/models/Bicycle";
import styles from "./BiciList.module.css";

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");

  // list documents from NEXT_PUBLIC_APPWRITE_DATABASE_ID  NEXT_PUBLIC_APPWRITE_COLLECTION_ID=

  const bicycles = await fetchBicycles();
  console.log("Bicycles:", bicycles);

  return (
    <ul className={styles["bici-card"]}>
      {bicycles.map((doc) => (
        <li key={doc.$id} className={styles["bici-card-item"]}>
          <BiciCard doc={doc} />
        </li>
      ))}
    </ul>
  );
}
async function fetchBicycles() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents as Bicycle[];
}
