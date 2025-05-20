import { databases } from "@/appwriteServer"
import { Bicycle } from "@/models/Bicycle"

export default async function Page() {
  const bicyclesList = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string
  ) as {
    documents: Bicycle[]
  };

  return (
    <div>
      <h1>Bicicletas</h1>
      <div>
        {bicyclesList.documents.map((bicycle) => (
          <div key={bicycle.$id}>
            <h2>{bicycle.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}