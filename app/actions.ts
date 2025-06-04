"use server";

import { AppwriteException, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/appwriteServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Reserva from "./models/Reserva";

export async function signUpWithEmail(
  prevState: { message: string },
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
    repeatPassword?: string;
    name: string;
  };
  const { email, password, repeatPassword, name } = data;

  if (password !== repeatPassword) {
    return { message: "Las contraseñas no coinciden" };
  }

  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/reservar");
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case "user_invalid_credentials":
          return {
            message:
              "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.",
          };
          break;
        case "general_argument_invalid":
          return {
            message: "la contraseña debe tener entre 8 y 255 caracteres",
          };
          break;
        case "general_rate_limit_exceeded":
          return {
            message:
              "Se ha excedido el límite de intentos. Por favor, inténtalo más tarde.",
          };
          break;

        case "user_already_exists":
          return {
            message:
              "El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.",
          };
          break;
        default:
          return {
            message:
              "Error inesperado: " +
              error.type +
              " " +
              error.message +
              " por favor reporta el error al administrador",
          };
          break;
      }
    } else {
      return { message: "Error inesperado: " + error };
    }
  }
}

export async function logInWithEmail(
  prevState: { message: string },
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };
  const { email, password } = data;

  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/reservar");
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.type) {
        case "user_invalid_credentials":
          return {
            message:
              "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.",
          };
          break;
        case "general_argument_invalid":
          return {
            message: "la contraseña debe tener entre 8 y 255 caracteres",
          };
          break;
        case "general_rate_limit_exceeded":
          return {
            message:
              "Se ha excedido el límite de intentos. Por favor, inténtalo más tarde.",
          };
          break;

        case "user_already_exists":
          return {
            message:
              "El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.",
          };
          break;
        default:
          return {
            message:
              "Error inesperado: " +
              error.type +
              " " +
              error.message +
              " por favor reporta el error al administrador",
          };
          break;
      }
    } else {
      return { message: "Error inesperado: " + error };
    }
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/login");
}

export async function createReserva(
  prevState: { message: string },
  bicicleta: string,
  userId: string,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries()) as {
    from: string;
    to: string;
  };
  const { from, to } = data;

  if (from >= to) {
    return {
      message: "Error: La fecha de inicio debe ser anterior a la fecha de fin",
    };
  }
  if (from < new Date().toISOString()) {
    return {
      message: "Error: La fecha de inicio no puede ser anterior a la fecha actual",
    };
  }

  try {
    const { databases } = await createSessionClient();

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
    const collectionId =
      process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;

    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      from,
      to,
      userId,
      bicicleta,
      status: "reserved",
    });

    return { message: "Reserva creada con éxito" };
  } catch (error) {
    return { message: "Error al crear la reserva: " + error };
  }
}

export async function cancelReserva(reserva: Reserva) {
  if (reserva.to < new Date().toISOString()) {
    return { message: "No se puede cancelar una reserva que ya ha terminado" };
  }

  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;
  try {
    await databases.updateDocument(databaseId, collectionId, reserva.$id, {
      status: "cancelled",
    });
    return { message: "Reserva cancelada con éxito" };
  } catch (error) {
    return { message: "Error al cancelar la reserva: " + error };
  }
}


export async function vetarUsuario(userId: string) {
  const { users } = await createAdminClient();

  const user = await users.get(userId);

  await users.updateLabels(
    userId,
    user.labels ? [...user.labels, 'vetado'] : ['vetado']
  );
}

export async function deleteBicycle(bicycleId: string) {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  try {
    await databases.deleteDocument(databaseId, collectionId, bicycleId);
    return { message: "Bicicleta eliminada con éxito" };
  } catch (error) {
    return { message: "Error al eliminar la bicicleta: " + error };
  }
}