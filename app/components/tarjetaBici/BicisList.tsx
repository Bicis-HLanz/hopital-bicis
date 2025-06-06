"use client";

import BiciCard from "./BiciCard";
import { Bicycle } from "@/models/Bicycle";
import styles from "./BiciList.module.css";
import { useEffect, useState } from "react";
import Reserva from "@/models/Reserva";

export default function BicisList({
  bicycles,
  reservas,
}: {
  bicycles: Bicycle[];
  reservas: Reserva[];
}) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredBicycles, setFilteredBicycles] = useState<Bicycle[]>(bicycles);

  useEffect(() => {
    if (!fromDate || !toDate) {
      setFilteredBicycles(bicycles);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const reservedBicyclesInRange = reservas
      .filter((reserva) => {
        const reservaFrom = new Date(reserva.from);
        const reservaTo = new Date(reserva.to);
        return (
          (from < reservaFrom && to > reservaFrom) || // Overlaps with start
          (from < reservaTo && to > reservaTo) || // Overlaps with end
          (from >= reservaFrom && to <= reservaTo) // Fully contained within reservation
        );
      })
      .map((reserva) => reserva.bicicleta.$id);

    const availableBicycles = bicycles.filter(
      (bicycle) => !reservedBicyclesInRange.includes(bicycle.$id)
    );

    setFilteredBicycles(availableBicycles);
  }, [fromDate, toDate, bicycles, reservas]);

  return (
    <>
      <div className={styles["bici-list-header"]}>
          <h3 className={styles.title}>Disponibles de: </h3>
          <input
            className={styles.formInput}
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="desde"
          />
          <h3 className={styles.title}> a </h3>
          <input
            className={styles.formInput}
            type="date"
            id="to"
            name="to"
            onChange={(e) => setToDate(e.target.value)}
            placeholder="hasta"
          />
      </div>

      <section>
        <ul className={styles["bici-card"]}>
          {filteredBicycles.map((doc) => (
            <li key={doc.$id} className={styles["bici-card-item"]}>
              <BiciCard doc={doc} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
