import Link from "next/link";
import Image from "next/image";
import { Models } from "appwrite";
import styles from "./BiciCard.module.css";

export default function BiciCard({ doc }: { doc: Models.Document }) {
  return (
    <Link href={`reservar/${doc.$id}`} className={styles.card}>
      <Image
        src={doc["image-url"]}
        alt={doc.name}
        width={200}
        height={200}
        className={styles.image}
      />
      <h2 className={styles.title}>{doc.name}</h2>
    </Link>
  );
}