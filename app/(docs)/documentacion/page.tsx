import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hospital de bicicletas</h1>
      <p className={styles.subtitle}>
        Por Darío Peregrín Alconchel y Cristina Díaz Cabello
      </p>
      <section className={styles.section}>
        <h2 className={styles["section-title"]}>¿Qué es esta aplicación?</h2>
        <p className={styles["section-text"]}>
          Esta aplicación permite a los alumnos del instituto Hermenegildo Lanz
          alquilar bicicletas de manera sencilla y gestionar sus reservas.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles["section-title"]}>Objetivo</h2>
        <p className={styles["section-text"]}>
          Facilitar el acceso al alquiler de bicicletas mediante una experiencia
          intuitiva y fácil de usar, permitiendo al usuario gestionar sus
          reservas de forma eficaz.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles["section-title"]}>Áreas principales de la app</h2>
        <ul className={styles.list}>
          <li className={styles["list-item"]}>
            <strong>Inicio:</strong> Vista general con la lista de bicicletas
            disponibles.
          </li>
          <li className={styles["list-item"]}>
            <strong>Reservar:</strong> Vista al seleccionar una de las
            bicicletas anteriores para su reserva.
          </li>
          <li className={styles["list-item"]}>
            <strong>Mis reservas:</strong> Sección donde el usuario puede ver
            todas sus reservas actuales.
          </li>
        </ul>
      </section>

    </div>
  );
}