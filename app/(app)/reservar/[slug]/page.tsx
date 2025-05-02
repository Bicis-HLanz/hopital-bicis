import { Query } from "appwrite";
import { databases } from "../../../appwrite";
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
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "not_set";

  let docs;
  try {
    docs = await databases.listDocuments(
      databaseId,
      collectionId,
      [Query.equal("name", slug)]
    );
  } catch (error) {
    console.error("Error fetching bicycle details:", error);
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error al cargar la información de la bicicleta
        </div>
      </div>
    );
  }

  const doc = docs.documents[0];

  if (!doc) {
    return <div>Bicicleta no encontrada</div>;
  }

  return (
    <div>
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
            {doc.description && (
              <p>{doc.description}</p>
            )}
            <div>
              <p><strong>Estado:</strong> {doc.status}</p>
              {doc.type && <p><strong>Tipo:</strong> {doc.type}</p>}
              {doc.location && <p><strong>Ubicación:</strong> {doc.location}</p>}
            </div>
            
            <button>
              Reservar esta bicicleta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}