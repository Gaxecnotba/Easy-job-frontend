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
        console.log(usercreated);
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
              htmlFor="username"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value="null"
                >
                  Null
                </option>
                <option
                  value="Canada"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  Canada
                </option>
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
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Ontario">Ontario</option>
                <option value="Quebec">Quebec</option>
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
                <option value="Edmonton">Edmonton</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Victoria">Victoria</option>
                <option value="Winnipeg">Winnipeg</option>
                <option value="Brandon">Brandon</option>
                <option value="Fredericton">Fredericton</option>
                <option value="Moncton">Moncton</option>
                <option value="Toronto">Toronto</option>
                <option value="Ottawa">Ottawa</option>
                <option value="Montreal">Montreal</option>
                <option value="Quebec City">Quebec City</option>
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
