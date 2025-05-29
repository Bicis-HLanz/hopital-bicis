import Image from "next/image";
import { getBycicleImage } from "@/appwrite";
import { Models } from "appwrite";
import styles from './TarjetaReserva.module.css';


export default function TarjetaReserva({ doc }: { doc: Models.Document }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={getBycicleImage(doc.bicicleta)}
                    alt={doc.bicicleta.name}
                    width={200}
                    height={200}
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
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
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
        </div>
    );
}