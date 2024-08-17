import React from "react";
import { useAuth } from "../context/authContext";

const Apply = () => {
  const { user } = useAuth();

  const handleApplyJob = () => {
    alert(
      `Your application was successful! We’ve sent your profile and information to the employer. A confirmation has been sent to your email: ${user.email}.`
    );
  };

  return (
    <button
      onClick={handleApplyJob}
      className="bg-greenboton hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Apply Now
    </button>
  );
};

export default Apply;
