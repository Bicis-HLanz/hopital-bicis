import BiciCard from "./BiciCard";
import { Bicycle } from "@/models/Bicycle";
import styles from "./BiciList.module.css";

export default async function BicisList({ bicycles }: { bicycles: Bicycle[] }) {
  return (
    <ul className={styles["bici-card"]}>
      {bicycles.map((doc) => (
        <li key={doc.$id} className={styles["bici-card-item"]}>
          <BiciCard doc={doc} />
        </li>
      ))}
    </ul>
  );
}
