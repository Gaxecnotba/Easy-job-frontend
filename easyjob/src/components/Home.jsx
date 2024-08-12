import { useAuth } from "../context/authContext";

export function Home() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      Home
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
