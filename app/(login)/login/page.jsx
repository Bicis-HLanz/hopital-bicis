// src/app/signup/page.jsx

import {
  getLoggedInUser
} from "@/appwriteServer";


import { ID } from "node-appwrite";
import { createAdminClient } from "@/appwriteServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signUpWithEmail(formData) {
  "use server";

  const data = Object.fromEntries(formData.entries());
  const { email, password, name } = data;

  const { account } = await createAdminClient();
  console.log("account", account);

  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/reservar");
}

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/reservar");

  return (
    <>
      <form action={signUpWithEmail}>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
        />
        <input
          id="name"
          name="name"
          placeholder="Name"
          type="text"
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

