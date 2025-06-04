"use client";

import { deleteBicycle } from "@/actions";
import { useState } from "react";

export default function BorrarBiciButton({ bicycle }: { bicycle: { $id: string } }) {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleDelete = () => {
      setIsLoading(true);

      deleteBicycle(bicycle.$id).then(() => {
        setIsLoading(false);
      });
    };

  return (
    <button
              disabled={isLoading}
              onClick={handleDelete}
            >
              Borrar bicicleta
            </button>
  );
}