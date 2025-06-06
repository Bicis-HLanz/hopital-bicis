"use client";

import Image from "next/image";
import { getBycicleImage } from "@/appwrite";
import BorrarBiciButton from "@/components/borrarBiciButton/BorrarBiciButton";
import styles from './TarjetaBicicleta.module.css';
import { Bicycle } from "@/models/Bicycle";

export default function TarjetaBicicleta({ bicycle, handleDelete }: { bicycle: Bicycle, handleDelete: () => void }) {

    return (
        <div key={bicycle.$id} className={styles.userCard}>
            <div className={styles.userInfo}>
                <Image
                    src={getBycicleImage(bicycle)}
                    alt={bicycle.name}
                    width={200}
                    height={100}
                    className={styles.cardImage}
                />
                <h2 className={styles.userName}>{bicycle.name}</h2>
            </div>
            <BorrarBiciButton bicycle={bicycle}
                handleDelete={handleDelete} />
        </div>
    )

}