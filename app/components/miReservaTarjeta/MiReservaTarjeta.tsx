"use client";

import Image from "next/image";
import { getMyReservations } from "@/appwrite";
import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const MiReservaTarjeta: React.FC = () => {
    const [documents, setDocuments] = useState<Models.Document[]>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setDocuments(await getMyReservations());
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, []);

    if (!documents) {
        return <div>No reservations found</div>;
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {documents.map((doc) => (
                    <li key={doc.$id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={doc.bicicleta["image-url"]}
                                alt={doc.bicicleta.name}
                                width={150}
                                height={150}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.cardTitle}>{doc.bicicleta.name}</h2>
                            <p className={styles.description}>{doc.bicicleta.description}</p>
                            <p className={styles.date}>Fecha de Reserva: {doc.from} - {doc.to}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiReservaTarjeta;