'use client';

import { useState } from 'react';
import styles from './VetarButton.module.css';

interface VetarButtonProps {
  userId: string;
  className?: string;
}

export default function VetarButton({ userId, className = '' }: VetarButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVetar = () => {
    setIsLoading(true);
    console.log(`Vetando usuario: ${userId}`);
    // Simulamos una llamada API
    setTimeout(() => {
      console.log(`Usuario ${userId} vetado`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleVetar}
      disabled={isLoading}
      className={`${styles.vetarButton} ${className}`}
      aria-label={`Vetar usuario ${userId}`}
    >
      {isLoading ? (
        <span className={styles.loadingText}>Procesando...</span>
      ) : (
        'Vetar'
      )}
    </button>
  );
}