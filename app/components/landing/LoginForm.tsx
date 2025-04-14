"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { account, ID } from "../../appwrite.js";

interface User {
  name: string;
  email: string;
  // Add other properties if needed
}

const LoginForm: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const login = async (email: string, password: string): Promise<void> => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get() as User);
  };

  const register = async (): Promise<void> => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  };

  const logout = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form className={styles["login-form"]}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={() => login(email, password)}>
        Login
      </button>
      <button type="button" onClick={register}>
        Register
      </button>
    </form>
  );
};

export default LoginForm;
