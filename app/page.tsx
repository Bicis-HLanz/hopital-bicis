import { getLoggedInUser } from "@/appwriteServer";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect("/login");

  redirect("/reservar");
}