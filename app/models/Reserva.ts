import { Models } from "appwrite";
import { Bicycle } from "./Bicycle";

export default interface Reserva extends Models.Document {
  from: string;
  to: string;
  userId: string;
  bicicleta: Bicycle;
  status: string;
}