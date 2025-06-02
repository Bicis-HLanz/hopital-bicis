"use client";

import styles from './MiReservaTarjeta.module.css';
import TarjetaReserva from "./TarjetaReserva";
import React from 'react';
import { cancelReserva } from '@/actions';
import Reserva from '@/models/Reserva';

export default function MiReservaTarjeta({documents}: {documents: Reserva[]}) {
    const [docs, setDocs] = React.useState<Reserva[]>(documents);

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
                           cancelReserva(doc);
                           setDocs(docs.filter((d) => d.$id !== doc.$id));
                       }}
                       />
                    </li>
                ))}
            </ul>
        </div>
    );
};