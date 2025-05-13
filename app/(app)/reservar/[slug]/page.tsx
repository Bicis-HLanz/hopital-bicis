import { databases } from "@/appwriteServer";
import Image from "next/image";
import styles from "./page.module.css";
import ReservarForm from "@/components/reservarForm/ReservarForm";
import { getBycicleImage } from "@/appwrite";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";

  const documents = await databases.listDocuments(databaseId, collectionId);

  return documents.documents.map((doc) => ({
    slug: doc.$id,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BiciDetails({ params }: Props) {
  const { slug } = await params;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "not_set";
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";


  let doc;
  try {
    doc = await databases.getDocument(databaseId, collectionId, slug);
  } catch (error) {
    console.error("Error fetching document:", error);
    return <div>Error al cargar los detalles de la bicicleta</div>;
  }

  if (!doc) {
    return <div>Bicicleta no encontrada</div>;
  }

  return (
    <div className={styles["reservar-grid"]}>
      <div className={styles["details"]}>
        <Image src={getBycicleImage(doc)} alt={doc.name} width={400} height={400} />

        <div className="details">
          <h1>{doc.name}</h1>
          {doc.description && <p>{doc.description}</p>}
        </div>
      </div>

      <ReservarForm bicycle={doc} />
    </div>
  );
}
