import Link from "next/link";
import Image from "next/image";
import { Models } from "appwrite";
import styles from "./BiciCard.module.css";

export default function BiciCard({ doc }: { doc: Models.Document }) {
  return (
    <Link href={`reservar/${doc.$id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={doc["image-url"]}
          alt={doc.name}
          width={300}
          height={200}
          className={styles.image}
          priority={false}
          loading="lazy"
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{doc.name}</h2>
        
        <button className={styles.reserveButton}>
          Reservar ahora
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </Link>
  );
}