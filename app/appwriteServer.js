import { Client, Account, Databases, Storage, Users } from 'node-appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
    .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);


export function getBycicleImage(imageId) {
    const url = storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        imageId
    ).href;

    console.log("URL de la imagen:", url);
    return url;
}