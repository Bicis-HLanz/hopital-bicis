import { users } from "@/appwriteServer";


// Revalida cada 60 segundos (ISR)
export const revalidate = 60

export default async function Page() {
  const usersListResponse = await users.list()
  const usersList = usersListResponse.users

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
