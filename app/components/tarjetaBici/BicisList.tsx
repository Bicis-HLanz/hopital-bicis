"use client";

import BiciCard from "./BiciCard";
import { Bicycle } from "@/models/Bicycle";
import styles from "./BiciList.module.css";
import { useEffect, useState } from "react";
import Reserva from "@/models/Reserva";

export default function BicisList({ bicycles, reservas }: { bicycles: Bicycle[], reservas: Reserva[] }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredBicycles, setFilteredBicycles] = useState<Bicycle[]>(bicycles);

  useEffect(() => {
    // Filter bicycles that have a reservation that overlaps with the selected date range
    if (!fromDate && !toDate) {
      setFilteredBicycles(bicycles);
      return;
    }

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const isOverlapping = (reserva: Reserva) => {
      const reservaFrom = new Date(reserva.fromDate);
      const reservaTo = new Date(reserva.toDate);

      if (from && to) {
        return reservaFrom <= to && reservaTo >= from;
      }
      if (from) {
        return reservaTo >= from;
      }
      if (to) {
        return reservaFrom <= to;
      }
      return false;
    };

    const unavailableBicycleIds = new Set(
      reservas.filter(isOverlapping).map((r) => r.bicycleId)
    );

    setFilteredBicycles(
      bicycles.filter((bici) => !unavailableBicycleIds.has(bici.$id))
    );
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
