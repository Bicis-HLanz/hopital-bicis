"use client";

import { getMyReservations, /*deleteReservation*/ } from "@/appwrite";
import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import TarjetaReserva from "./TarjetaReserva";

const MiReservaTarjeta: React.FC = () => {
    const [documents, setDocuments] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

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

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleCancel = async (reservationId: string) => {
        const isConfirmed = window.confirm(
            "¿Estás seguro de que quieres cancelar esta reserva?\n\n" +
            "Esta acción no se puede deshacer."
        );

        if (!isConfirmed) return;

        setDeletingId(reservationId);
        
       /* try {
            await deleteReservation(reservationId);
            setDocuments(prev => prev.filter(doc => doc.$id !== reservationId));
        } catch (error) {
            console.error("Error al cancelar reserva:", error);
            alert("No se pudo cancelar la reserva. Por favor intenta nuevamente.");
        } finally {
            setDeletingId(null);
        }*/
    };

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
                    <li key={doc.$id}>
                       <TarjetaReserva doc={doc} />
                       <button 
                         className={styles.cancelButton}
                         onClick={() => handleCancel(doc.$id)}
                         disabled={deletingId === doc.$id}
                       >
                         {deletingId === doc.$id ? (
                           "Cancelando..."
                         ) : (
                           "Cancelar Reserva"
                         )}
                       </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiReservaTarjeta;