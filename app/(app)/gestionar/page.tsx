import Link from "next/link";

export default function Page() {
  return (
    <main>
      <section>
        <h1>Gestionar</h1>
        <ul>
            <li><Link href="/gestionar/bicicletas">Bicicletas</Link></li>
            <li><Link href="/gestionar/usuarios">Usuarios</Link></li>
        </ul>
      </section>
    </main>
  );
}