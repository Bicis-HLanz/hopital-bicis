import Image from "next/image";
import styles from "./page.module.css";
import ReservarForm from "@/components/reservarForm/ReservarForm";
import { getBycicleImage } from "@/appwrite";
import { Bicycle } from "@/models/Bicycle";
import { createSessionClient, getLoggedInUser } from "@/appwriteServer";
import { redirect } from "next/navigation";

export default async function BiciDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getLoggedInUser();
  if (!user) {
    return redirect("/login");
  }

  const { slug } = await params;

  

  const bicycle = await fetchBicycle(slug);

  return (
    <div className={styles["reservar-grid"]}>
      <div className={styles["details"]}>
        <Image
          src={getBycicleImage(bicycle)}
          alt={bicycle.name}
          width={150}
          height={150}
        />

        <div className={styles["details1"]}>
          <h1>{bicycle.name}</h1>
          {bicycle.description && <p>{bicycle.description}</p>}
        </div>
      </div>

      <ReservarForm bicycle={bicycle} userID={user?.$id} />
    </div>
  );
}

async function fetchBicycle(bicycleId: string) {
  const { databases } = await createSessionClient();
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

  const response = await databases.getDocument<Bicycle>(
          databaseId,
          collectionId,
          bicycleId
        );
  return response as Bicycle;
}