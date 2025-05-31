"use server";

import { AppwriteException, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/appwriteServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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