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
        <h1>Gestionar</h1>
        <ul className={styles.ul}>
          {gestionItems.map((item, index) => (
            <li key={index} className={styles.li}>
              <Link href={item.href} className={styles.link}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={180}
                    className={styles.cardImage}
                  />
                </div>
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
