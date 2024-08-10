import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import axios from "axios";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const signIn = await signup(user.email, user.password);
      if (signIn) {
        const { uid, email } = signIn.user; // Retrieve uid and email from Firebase user object
        const usercreated = await axios.post(
          "http://localhost:3000/users/create",
          {
            uid: uid,
            email: email,
          }
        );
        if (usercreated.data.message === "User created successfully") {
          navigate("/");
        }
      } else {
        setError("Error in signing up");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray700 text-sm font-fold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@company.com"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray700 text-sm font-fold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <button className="bg-blue500 hover:bg-blue700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </form>
        <p className="my-4 text-sm flex justify-between px-3">
          Already have an Account?<Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}
