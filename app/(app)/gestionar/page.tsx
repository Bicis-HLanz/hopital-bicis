import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function GestionPage() {
  const gestionItems = [
    {
      title: "Bicicletas",
      href: "/gestionar/bicicletas",
      description: "Administrar inventario",
      image: "/bici.jpg"
    },
    {
      title: "Usuarios",
      href: "/gestionar/usuarios",
      description: "Gestionar usuarios del sistema",
      image: "/alumno.jpg"
    }
  ];

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.rowContainer}>
          {gestionItems.map((item, index) => (
            <Link href={item.href} key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.cardLink}>Administrar →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}