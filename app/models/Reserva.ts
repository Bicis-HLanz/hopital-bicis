import { Models } from "appwrite";

export default interface Reserva extends Models.Document {
  from: string;
  to: string;
  userId: string;
  bicicleta: string;
  status: string;
}