import React from "react";
import Apply from "./Apply";

const Card = ({ job, showApply }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.location}</p>
      <div className="flex space-x-2 mt-2"></div>
      <p className="mt-2 text-sm text-gray-700">{job.description}</p>
      {showApply && <Apply />}
    </div>
  );
};

export default Card;
