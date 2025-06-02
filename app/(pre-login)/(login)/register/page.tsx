import { getLoggedInUser } from "@/appwriteServer";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/login/RegisterForm";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/reservar");

  return (
    <RegisterForm/>
  );
}
