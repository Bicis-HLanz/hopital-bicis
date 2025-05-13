import { Client, Account, Databases, ID, Query, Storage } from "appwrite";

export const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

interface Reserva {
  from: string;
  to: string;
  userId: string;
  bicicleta: string;
}

export async function createReserva(from: string, to: string, bicycleId: string): Promise<Reserva> {
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
    const user = await account.get();
    const userID = user.$id;

    const response = await databases.createDocument<Reserva>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID as string,
      ID.unique(),
      { from, to, userId: userID, bicicleta: bicycleId }
    );
    return response;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

export async function getMyReservations(): Promise<Reserva[]> {
  try {
    const user = await account.get();
    const userID = user.$id;

    const response = await databases.listDocuments<Reserva>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID as string,
      [Query.equal("userId", userID)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}

export function getBycicleImage(doc: { imageId: string }): string {
  const url = storage.getFilePreview(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
    doc.imageId
  ).href;
  return url;
}