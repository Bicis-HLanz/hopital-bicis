import { Client, Account, Databases, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);


export async function createReserva(from, to, bicycleId) {
  try {
    const userID = (await account.get()).$id;

    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID,
      ID.unique(),
      { "from": from, "to": to , "userId": userID, "bicicleta": bicycleId }
    );
    return response;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}