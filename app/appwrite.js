import { Client, Account, Databases, ID, Query } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);


export async function createReserva(from, to, bicycleId) {
  if (!from || !to) {
    throw new Error("Las fechas de inicio y fin son obligatorias");
  }
  if (Date.parse(from) > Date.parse(to)) {
    throw new Error("La fecha de inicio no puede ser mayor a la fecha de fin");
  }
  if (Date.parse(from) < Date.now()) {
    throw new Error("La fecha de inicio no puede ser menor a la fecha actual");
  }
  if (Date.parse(to) < Date.now()) {
    throw new Error("La fecha de fin no puede ser menor a la fecha actual");
  }

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

export async function getMyReservations() {
  try {
    const userID = (await account.get()).$id;
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID,
      [Query.equal("userId", userID)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}