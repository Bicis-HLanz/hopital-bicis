"use client";

import { getMyReservations } from "@/appwrite";
import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import TarjetaReserva from "./TarjetaReserva";

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
                <h3>No tienes reservas aún</h3>
                <p>Explora nuestras bicicletas y haz tu primera reserva</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {documents.map((doc) => (
                    <li key={doc.$id} >
                       <TarjetaReserva doc={doc} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiReservaTarjeta;