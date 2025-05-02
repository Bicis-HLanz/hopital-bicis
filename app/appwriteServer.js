import { Client, Account, Databases } from 'node-appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
    .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;

export const account = new Account(client);
export const databases = new Databases(client);