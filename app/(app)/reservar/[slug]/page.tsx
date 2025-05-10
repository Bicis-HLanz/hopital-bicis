import { databases } from "@/appwriteServer";
import Image from "next/image";
import styles from "./page.module.css";

// Define the page props to get the params from the dynamic route
type Props = {
  params: {
    slug: string;
  };
};

// This is a Server Component that will fetch and display the bicycle details
export default async function BiciDetails({ params }: Props) {
  const { slug } = await params;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";

  const doc = await databases.getDocument(databaseId, collectionId, slug);

  if (!doc) {
    return <div>Bicicleta no encontrada</div>;
  }

  return (
    <div className={styles["reservar-grid"]}>
      <Image src={doc["image-url"]} alt={doc.name} width={400} height={400} />

      <div className="details">
        <h1>{doc.name}</h1>
        {doc.description && <p>{doc.description}</p>}
      </div>

      <div className={styles["fcol"]}>
        <div>
          <label htmlFor="from">from:</label>
          <input type="datetime-local" id="from" name="from"></input>
        </div>
        <div>
          <label htmlFor="to">to:</label>
          <input type="datetime-local" id="to" name="to"></input>
        </div>
        <button type="button">Reservar</button>
      </div>
    </div>
  );
}
