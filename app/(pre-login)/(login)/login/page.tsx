// src/app/signup/page.tsx

import {
  getLoggedInUser
} from "@/appwriteServer";

import { redirect } from "next/navigation";
import LoginForm from "@/components/login/LoginForm";


export default async function SignUpPage(){
  const user = await getLoggedInUser();
  if (user) redirect("/reservar");

  return (
    <LoginForm />
  );
}
