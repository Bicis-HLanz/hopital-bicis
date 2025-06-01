import AppHeader from "@/components/mainLayout/Header/AppHeader";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}