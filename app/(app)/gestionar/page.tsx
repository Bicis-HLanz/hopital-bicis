import Link from "next/link";
import styles from "./page.module.css";

export default function GestionPage() {
  const gestionItems = [
    {
      title: "Bicicletas",
      href: "/gestionar/bicicletas",
      description: "Administrar inventario de bicicletas"
    },
    {
      title: "Usuarios",
      href: "/gestionar/usuarios",
      description: "Gestionar usuarios del sistema"
    }
  ];

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1>Gestionar</h1>
        <ul className={styles.ul}>
          {gestionItems.map((item, index) => (
            <li key={index} className={styles.li}>
              <Link href={item.href} className={styles.link}>
                <span>{item.title}</span>
                <p>{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}