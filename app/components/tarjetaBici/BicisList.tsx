import React, { useEffect, useState } from "react";
import { Models } from "appwrite";
import { Databases } from "appwrite";
import { client } from "@/appwrite";
import BiciCard from "./BiciCard";

const BicisList: React.FC = () => {
  const [documents, setDocuments] = useState<Models.Document[]>([]);

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";

  useEffect(() => {
    const fetchDocuments = async () => {
      const databases = new Databases(client);
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setDocuments(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [databaseId, collectionId]);

  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc.$id}>
          <BiciCard doc={doc} />
        </li>
      ))}
    </ul>
  );
};

export default BicisList;
