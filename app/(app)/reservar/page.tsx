'use client';

import { Client, Databases } from 'appwrite';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Models } from 'appwrite';

const ReservarPage = () => {

  const [documents, setDocuments] = useState<Models.Document[]>([]);
  const client = useMemo(() => {
    const appwriteClient = new Client();
    appwriteClient
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'default_project_id');
    return appwriteClient;
  }, []);

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'default_database_id';
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'default_collection_id';

  useEffect(() => {
    const fetchDocuments = async () => {
      const databases = new Databases(client);
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        setDocuments(response.documents);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, [client, databaseId, collectionId]);

  return (
    <div>
      <h1>Reservar</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.$id}>
            <h2>{doc.name}</h2>
            <Image src={doc['image-url']} alt={doc.name} style={{ maxWidth: '200px' }} width={200} height={200} />
            <p>{doc.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservarPage;