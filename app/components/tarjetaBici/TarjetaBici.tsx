import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Models } from "appwrite";
import { Client, Databases } from "appwrite";

const TarjetaBici: React.FC = () => {
  const [documents, setDocuments] = useState<Models.Document[]>([]);
  const client = useMemo(() => {
    const appwriteClient = new Client();
    appwriteClient
      .setEndpoint(
        process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
          "https://cloud.appwrite.io/v1"
      )
      .setProject(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "default_project_id"
      );
    return appwriteClient;
  }, []);

  const databaseId =
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "default_database_id";
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "default_collection_id";

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
  }, [client, databaseId, collectionId]);

  return (
    <ul>
      <li className="tarjetaBici">
        <div className="tarjetaBici__container">
          {documents.map((doc) => (
            <div key={doc.$id} className="tarjetaBici__item">
              <Image
                src={doc["image-url"]}
                alt={doc.name}
                style={{ maxWidth: "200px" }}
                width={200}
                height={200}
              />
              <h2 className="tarjetaBici__name">{doc.name}</h2>
            </div>
          ))}
        </div>
      </li>
    </ul>
  );
};

export default TarjetaBici;
