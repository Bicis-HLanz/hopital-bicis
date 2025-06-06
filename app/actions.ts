"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
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

  const emailDomain = email.split("@").at(-1);
  const allowedDomain = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN!;
  if (emailDomain !== allowedDomain) {
    return {
      message:
        "Error: El dominio del correo electrónico no está permitido, usa tu email de " +
        allowedDomain,
    };
  }

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
  redirect("/reservar");
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
      if (error instanceof Error) {
        return {
          message: "Error inesperado: " + error.message + "\n" + error.stack,
        };
      } else {
        return { message: "Error inesperado: " + String(error) };
      }
    }
  }
  redirect("/reservar");
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

  // Validaciones simples
  if (from >= to) {
    return {
      message: "Error: La fecha de inicio debe ser anterior a la fecha de fin",
    };
  }
  if (from < new Date().toISOString()) {
    return {
      message:
        "Error: La fecha de inicio no puede ser anterior a la fecha actual",
    };
  }

  // Si la diferencia entre from y to es mayor a 30 dias, retornar error
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 30) {
    return {
      message: "Error: La reserva no puede ser mayor a 30 días",
    };
  }

  // Validar que el usuario no tenga una reserva activa
  const { databases } = await createSessionClient();

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID!;

  const reservasActivas = await databases.listDocuments(
    databaseId,
    collectionId,
    [
      Query.equal("userId", userId),
      Query.equal("status", "reserved"),
      Query.greaterThanEqual("from", new Date().toISOString()),
    ]
  );

  if (reservasActivas.total > 0) {
    return {
      message: "Error: Ya tienes una reserva activa",
    };
  }

  try {
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
    user.labels ? [...user.labels, "vetado"] : ["vetado"]
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

export async function createBicycle(
  prevState: { message: string },
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries()) as {
    name: string;
    description: string;
    photo: File;
  };

  const { name, description } = data;

  const { databases, storage, account } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  const imageId = ID.unique();
  console.log(formData);
  console.log("subiendo como " + (await account.get()).labels);
  try {
    await storage.createFile(bucketId, imageId, data.photo);
    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      name,
      description,
      imageId,
    });
    console.log("subido");
    return { message: "Bicicleta creada con éxito" };
  } catch (error) {
    console.log(error);
    return { message: "Error al crear la bicicleta: " + error };
  }
}
