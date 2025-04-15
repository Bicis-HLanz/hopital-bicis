interface User {
  name: string;
  email: string;
}

export default function LogoutForm({
  logout,
  loggedInUser,
}: {
  logout: () => void;
  loggedInUser: User;
}) {
  return (
    <form>
      <h1>Usuario: {loggedInUser.name}</h1>
      <p>¿Quieres cerrar sesión?</p>
      <button type="button" onClick={logout}>
        Cerrar sesión
      </button>
    </form>
  );
}
