import { FaUser } from "react-icons/fa";
import { useState } from "react";

import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-navbar">
      <div className="max-w-screen-xl text-white flex flex-wrap items-center justify-between mx-auto p-3">
        <div className="flex justify-between">
          <a href="/" className="teko-text text-4xl custom-text-border">
            <h1>Easyjobs</h1>
          </a>
        </div>
        <div className="flex items-center space-x-4 gap-10">
          <a href="/" className="flex items-center space-x-4 gap-10">
            Home
          </a>
          <Link href="/contact" className="textcolor">
            Contact
          </Link>
          <Link href="/about" className="textcolor">
            About
          </Link>
        </div>
        {user ? (
          <div
            className="z-10 hiddendivide-y divide-gray-100"
            id="Dropdownmenu"
          >
            <button className="textcolor" onClick={toggleDropdown}>
              <FaUser />
            </button>
            {isDropdownOpen && (
              <div className="bg-bgmain absolute mt-3 p-3 w-[260px] h-[150px] border rounded shadow-xl">
                <ul className="text-darkgray text-sm">
                  {user ? (
                    <li className="mb-1 font-bold">{user.email}</li>
                  ) : (
                    <></>
                  )}

                  <Link className="mb-1" to={"/profile"}>
                    Profile
                  </Link>
                  <li className="mb-1">Applied Jobs</li>
                  <Link to={"/post"} className="mb-1">
                    Post
                  </Link>
                  <div className="p-2 text-center text-navbar font-bold hover:text-green-400">
                    {user ? (
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    ) : (
                      <li>
                        <Link to={"/login"}></Link>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/login" className="flex items-center space-x-4 gap-10">
              Sign in
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
