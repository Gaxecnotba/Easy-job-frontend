import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

export function Home() {
  const { user, loading } = useAuth();

  console.log(user);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // const token = await user.getIdToken();
        const response = await axios.get(
          `http://localhost:3000/users/${user.uid}`
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      loadUser();
    }
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      Home
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
