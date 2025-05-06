import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Models } from "appwrite";
import { databases } from "@/appwrite";
import styles from './MiReservaTarjeta.module.css';

const MiReservaTarjeta: React.FC = () => {
    const [documents, setDocuments] = useState<Models.Document[]>([]);
    
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";
    
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await databases.listDocuments(databaseId, collectionId);
                setDocuments(response.documents);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, [databaseId, collectionId]);

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {documents.map((doc) => (
                    <li key={doc.$id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src={doc["image-url"]}
                                alt="Bici" 
                                width={150} 
                                height={150}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.cardTitle}>{doc.name}</h2>
                            <p className={styles.description}>{doc.description}</p>
                            <p className={styles.date}>Fecha de Reserva: {doc.fechaReserva}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiReservaTarjeta;