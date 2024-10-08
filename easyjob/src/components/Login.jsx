import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Please enter your email address");

    try {
      await resetPassword(user.email);
      setError("Password reset email sent");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-[350px]">
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

          <div className="flex items-center justify-between">
            <button className="bg-greenboton hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>

            <a
              href="#!"
              className="inline-block aling-baseline font-bold text-sm text-greenboton hover:text-green-700"
              onClick={handleResetPassword}
            >
              Forgot password?
            </a>
          </div>
        </form>
        <p className="my-4 text-sm flex justify-between px-3">
          Don't have an Account?<Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
}
