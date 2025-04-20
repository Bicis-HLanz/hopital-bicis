export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {children}
        </main>
    );
  }