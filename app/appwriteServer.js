"use server";

import { Client, Account, Storage, Databases } from 'node-appwrite';
import { cookies } from "next/headers";



export async function getBycicleImage(imageId) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

    const storage = new Storage(client);

    const url = storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        imageId
    ).href;

    console.log("URL de la imagen:", url);
    return url;
}


export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const cookieStore = await cookies();
  const session = cookieStore.get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_API_KEY)
    .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

  return {
    get account() {
      return new Account(client);
    },
  };
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}