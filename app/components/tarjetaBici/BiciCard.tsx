import Link from "next/link";
import Image from "next/image";
import { Models, } from "appwrite";

export default function BiciCard({ doc }: { doc: Models.Document }) {
  return (
    <Link href={`reservar/${doc.$id}`}>
      <Image src={doc["image-url"]} alt={doc.name} width={200} height={200} />
      <h2>{doc.name}</h2>
    </Link>
  );
}
