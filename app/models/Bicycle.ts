import { Models } from "appwrite";

export interface Bicycle extends Models.Document {
    name: string;
    description: string;
    imageId: string;
}