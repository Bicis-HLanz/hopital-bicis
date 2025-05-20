import MiReservaTarjeta from "@/components/miReservaTarjeta/MiReservaTarjeta";
import styles from "./page.module.css";

const MisReservasPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.children}>
        <MiReservaTarjeta />
      </section>
    </main>
  );
};

export default MisReservasPage;
