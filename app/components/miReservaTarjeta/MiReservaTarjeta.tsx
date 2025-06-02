"use client";

import styles from './MiReservaTarjeta.module.css';
import { Models } from "appwrite";
import TarjetaReserva from "./TarjetaReserva";
import React from 'react';
import { cancelReserva } from '@/actions';

export default function MiReservaTarjeta({documents}: {documents: Models.Document[]}) {
    const [docs, setDocs] = React.useState<Models.Document[]>(documents);

    if (!docs || docs.length === 0) {
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
                {docs.map((doc) => (
                    <li key={doc.$id}>
                       <TarjetaReserva
                       doc={doc}
                       onCancelation={() => {
                           cancelReserva(doc.$id);
                           setDocs(docs.filter((d) => d.$id !== doc.$id));
                       }}
                       />
                    </li>
                ))}
            </ul>
        </div>
    );
};