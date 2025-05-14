"use client";

import Image from "next/image";
import { getMyReservations, getBycicleImage } from "@/appwrite";
import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const MiReservaTarjeta: React.FC = () => {
    const [documents, setDocuments] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getMyReservations();
                setDocuments(data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando tus reservas...</p>
            </div>
        );
    }

    if (!documents || documents.length === 0) {
        return (
            <div className={styles.emptyState}>
                <Image
                    src="/assets/no-reservations.svg"
                    alt="No reservations"
                    width={200}
                    height={200}
                />
                <h3>No tienes reservas aún</h3>
                <p>Explora nuestras bicicletas y haz tu primera reserva</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {documents.map((doc) => (
                    <li key={doc.$id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={getBycicleImage(doc.bicicleta)}
                                alt={doc.bicicleta.name}
                                width={300}
                                height={300}
                                className={styles.image}
                                priority
                            />
                            <div className={styles.imageOverlay}></div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.header}>
                                <h2 className={styles.cardTitle}>{doc.bicicleta.name}</h2>
                            </div>
                            <p className={styles.description}>{doc.bicicleta.description}</p>
                            <div className={styles.dateContainer}>
                                <svg className={styles.dateIcon} viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                                </svg>
                                <p className={styles.date}>
                                    <span className={styles.dateLabel}>Reserva:</span> 
                                    {new Date(doc.from).toLocaleDateString()} - {new Date(doc.to).toLocaleDateString()}
                                </p>
                            </div>
                            <div className={styles.statusBadge}>
                                {doc.status === 'reserved' ? 'Reservado' : 
                                    doc.status === 'started' ? 'En curso' :
                                    doc.status === 'canceled' ? 'Cancelado' :
                                    'Otro'}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiReservaTarjeta;