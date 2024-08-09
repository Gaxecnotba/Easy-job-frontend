import { useAuth } from "../context/authContext";

export function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      Home
      <h1>Welcome {user.email}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
