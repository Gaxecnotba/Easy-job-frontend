import { FaUser } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.jpg";
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="bg-navarbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex justify-between">
          <a href="/" className="textcolor">
            <img src={logo} alt="logo" className="h-10" />
          </a>
        </div>
        <div className="flex items-center space-x-4 gap-10">
          <a href="/" className="flex items-center space-x-4 gap-10 textcolor">
            Home
          </a>
          <a href="/#" className="textcolor">
            Create Job
          </a>
          <a href="/#" className="textcolor">
            About
          </a>
        </div>
        <div className="z-10 hiddendivide-y divide-gray-100" id="Dropdownmenu">
          <button className="textcolor" onClick={toggleDropdown}>
            <FaUser />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-1 p-2 w-auto bg-navarbar border bordercolor rounded shadow-lg z-10">
              <ul className="">
                <li className="textcolor cursor-pointer">Email</li>
                <li className="textcolor cursor-pointer">Profile</li>
                <li className="textcolor cursor-pointer">Applied Jobs</li>
                <li className="textcolor cursor-pointer">Sign out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
