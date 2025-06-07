'use client';

import { useState } from 'react';
import styles from './VetarButton.module.css';
import { vetarUsuario } from '@/actions';
import { Models } from 'node-appwrite';

interface VetarButtonProps {
  user: Models.User<Models.Preferences>;
  className?: string;
  onVetar: () => void;
}

export default function VetarButton({ user, className = '', onVetar }: VetarButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVetar = () => {
    setIsLoading(true);

    vetarUsuario(user.$id).then(() => {
      setIsLoading(false);
      onVetar();
    });
  };

  const isDisabled = user.labels?.includes('vetado');

  return (
    <button
      onClick={() => {
        const confirmCancel = window.confirm("¿Estás seguro de que quieres vetar a este usuario?");
        if (confirmCancel) {
          handleVetar();
        }
      }}
      disabled={isLoading || isDisabled}
      className={`${styles.vetarButton} ${className}`}
      aria-label={`Vetar usuario ${user.name}`}
    >
      {isLoading ? (
        <span className={styles.loadingText}>Vetando...</span>
      ) : (
        isDisabled ? (
          <span className={styles.disabledText}>Vetado</span>
        ) : (
          <span className={styles.buttonText}>Vetar</span>
        )
      )}
    </button>
  );
}