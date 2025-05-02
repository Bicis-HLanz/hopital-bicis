import { databases } from "@/appwriteServer";
import Image from "next/image";

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
    <div>
      <div>
        <div>
          <Image
            src={doc["image-url"]}
            alt={doc.name}
            width={400}
            height={400}
          />
        </div>
        <div>
          <h1>{doc.name}</h1>
          {doc.description && <p>{doc.description}</p>}
          <div>
            <p>
              <strong>Estado:</strong> {doc.status}
            </p>
            {doc.type && (
              <p>
                <strong>Tipo:</strong> {doc.type}
              </p>
            )}
            {doc.location && (
              <p>
                <strong>Ubicación:</strong> {doc.location}
              </p>
            )}
          </div>

          <button>Reservar esta bicicleta</button>
        </div>
      </div>
    </div>
  );
}