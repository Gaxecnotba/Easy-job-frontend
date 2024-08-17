import Apply from "./Apply";
import { FaLocationDot } from "react-icons/fa6";

const Card = ({ job, showApply }) => {
  return (
    <div className="border rounded-lg shadow-md p-10 bg-white max-w-2xl mx-auto my-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-700">{job.title}</h2>
      </div>
      <div>
        <p className="mt-10 text-sm text-gray-700 mb-6">{job.description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 flex items-center mt-2 mb-2">
          <FaLocationDot className="mr-1" />
          {job.job_location}
        </p>
      </div>

      <div className="flex space-x-2 mt-4"></div>
      {showApply && <Apply />}
    </div>
  );
};

export default Card;
