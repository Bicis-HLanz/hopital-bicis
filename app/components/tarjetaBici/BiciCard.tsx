import Link from "next/link";
import Image from "next/image";
import { Bicycle } from "@/models/Bicycle";
import styles from "./BiciCard.module.css";
import {getBycicleImage} from "@/appwrite";


export default function BiciCard({ doc }: { doc: Bicycle }) {
  return (
    <Link href={`reservar/${doc.$id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={getBycicleImage(doc)}
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
      </div>
    </Link>
  );
}