import React, { useEffect, useState } from "react";
import { databases } from "@/appwrite";
import BiciCard from "./BiciCard";
import styles from "./BiciList.module.css";
import { Bicycle } from "@/models/Bicycle";

const BicisList: React.FC = () => {
  const [documents, setDocuments] = useState<Bicycle[]>([]);

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setDocuments(response.documents as Bicycle[]);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [databaseId, collectionId]);

  return (
    <ul className={styles["bici-card"]}>
      {documents.map((doc) => (
        <li key={doc.$id} className={styles["bici-card-item"]}>
          <BiciCard doc={doc} />
        </li>
      ))}
    </ul>
  );
};

export default BicisList;
