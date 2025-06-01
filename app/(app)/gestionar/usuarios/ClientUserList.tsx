'use client';

import { useState, useEffect } from "react";
import VetarButton from "@/components/vetarButton/VetarButton";
import styles from './page.module.css';

interface User {
  $id: string;
  name: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function ClientUserList({ users }: Props) {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    const query = search.toLowerCase();
    const result = users.filter(user =>
      user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(result);
  }, [search, users]);

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.usersList}>
        {filteredUsers.map(user => (
          <div key={user.$id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <VetarButton userId={user.$id} className={styles.customButton} />
          </div>
        ))}
      </div>
    </>
  );
}
