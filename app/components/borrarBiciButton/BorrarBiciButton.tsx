"use client";
import { createSessionClient } from "@/appwriteServer";

export default function BorrarBiciButton({ bicycle }: { bicycle: { $id: string } }) {
  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta bicicleta?")) {
      try {
        const { databases } = await createSessionClient();
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
        
        await databases.deleteDocument(databaseId, collectionId, bicycle.$id);
        alert("Bicicleta eliminada correctamente.");
        window.location.reload(); // Recargar la página para reflejar los cambios
      } catch (error) {
        console.error("Error al eliminar la bicicleta:", error);
        alert("Error al eliminar la bicicleta. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <button
              
              onClick={handleDelete}
            >
              Borrar bicicleta
            </button>
  );
}