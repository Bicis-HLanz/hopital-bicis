"use server";

import { Client, Account, Storage, Databases } from 'node-appwrite';
import { cookies } from "next/headers";


/**
 * Retrieves a preview URL for a bicycle image from Appwrite Storage
 * 
 * @param {string} imageId - The ID of the image file in Appwrite Storage
 * @returns {Promise<string>} A URL to preview the image
 */
export async function getBycicleImage(imageId) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

    const storage = new Storage(client);

    const url = storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        imageId
    ).href;

    return url;
}


/**
 * Creates an authenticated Appwrite client using a session cookie
 * 
 * @returns An object with getters for Appwrite services (account, storage, databases)
 * @throws {Error} If no valid session is found in cookies
 */
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

/**
 * Creates an Appwrite client with API key authentication for admin operations
 * 
 * @returns An object with a getter for Appwrite account service
 */
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


/**
 * Retrieves the currently logged-in user's account information
 * 
 * @returns User account object if logged in, null otherwise
 */
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}