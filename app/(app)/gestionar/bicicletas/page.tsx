import { createSessionClient } from "@/appwriteServer"
import { Bicycle } from "@/models/Bicycle"

export default async function Page() {
  const bicyclesList = await fetchBicycles();

  return (
    <div>
      <h1>Bicicletas</h1>
      <div>
        {bicyclesList.map((bicycle) => (
          <div key={bicycle.$id}>
            <h2>{bicycle.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

async function fetchBicycles() {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents as Bicycle[];
}
