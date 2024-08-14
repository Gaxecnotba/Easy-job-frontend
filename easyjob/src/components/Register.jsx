import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import axios from "axios";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    country: "",
    province: "",
    city: "",
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
            username: user.username,
            name: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            countryName: user.country,
            provinceName: user.province,
            cityName: user.city,
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
      <div className="w-[600px]">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                LastName
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="nickname or username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="123-456-7890"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <div>
              <select
                name="country"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              >
                <option
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  Country
                </option>
                <option value="01">Canada</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Province
            </label>
            <div>
              <select
                name="province"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              >
                <option value="">Province</option>
                <option value="01">Alberta</option>
                <option value="02">British Columbia</option>
                <option value="03">Manitoba</option>
                <option value="04">New Brunswick</option>
                <option value="05">Ontario</option>
                <option value="06">Quebec</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <div>
              <select
                name="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              >
                <option value="">City </option>
                <option value="0102">Edmonton</option>
                <option value="0201">Vancouver</option>
                <option value="0202">Victoria</option>
                <option value="0301">Winnipeg</option>
                <option value="0302">Brandon</option>
                <option value="0401">Fredericton</option>
                <option value="0402">Moncton</option>
                <option value="0501">Toronto</option>
                <option value="0502">Ottawa</option>
                <option value="0601">Montreal</option>
                <option value="0602">Quebec City</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
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

          <div className="mb-3">
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
        <p className="my-3 text-sm flex justify-between px-3">
          Already have an Account?<Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}
