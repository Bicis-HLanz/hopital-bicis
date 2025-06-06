"use client";

import { Bicycle } from '@/models/Bicycle';
import styles from './ListaTarjetas.module.css';
import TarjetaBicicleta from "./TarjetaBicicleta";
import React from 'react';

export default function MiReservaTarjeta({ documents }: { documents: Bicycle[] }) {
    const [docs, setDocs] = React.useState<Bicycle[]>(documents);

    if (!docs || docs.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No existen Bicicletas aún</h3>
                <p>¡Prueba a crear la primera!</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {docs.slice().reverse().map((doc) => (
                    <li key={doc.$id}>
                        <TarjetaBicicleta bicycle={doc}
                            handleDelete={() => {
                                setDocs((prevDocs) => prevDocs.filter((d) => d.$id !== doc.$id));
                            }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};