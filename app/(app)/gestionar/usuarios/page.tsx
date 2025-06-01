import { createAdminClient} from "@/appwriteServer";

export default async function Page() {
  const usersList = await fetchUsers();

  return (
    <>
      <h1>Users</h1>
      {usersList.map((user) => (
        <article key={user.$id}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </article>
      ))}
    </>
  )
}

async function fetchUsers() {
  const { users } = await createAdminClient();

  const response = await users.list();
  return response.users;
}