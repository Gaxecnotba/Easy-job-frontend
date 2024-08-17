import { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSuggestions } from "../services/aiservices";

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    location: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState(null);

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uid = user.uid;
      await axios.post("http://localhost:3000/createpost", {
        uid: uid,
        title: post.title,
        description: post.description,
        location: post.location,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestions = async () => {
    const suggestions = await getSuggestions(post.description);
    if (suggestions) {
      setSuggestions(suggestions.description);
    } else {
      console.error("Failed to get suggestions.");
    }
  };

  const formatText = (text) => {
    // Replace "*" with bold text
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace "*" with italic text
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace "-" with bullet points
    formattedText = formattedText.replace(/^- /gm, "<li>$&</li>");

    return formattedText;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Suggestion copied to clipboard!");
  };

  return (
    <div className="flex w-full h-screen items-start justify-center p-6 space-x-4">
      <div className="w-[450px] relative">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Post Your Job
          </h1>

          <div className="relative">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <textarea
              name="title"
              id="title"
              value={post.title}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="1"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={post.description}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Job Location
            </label>
            <textarea
              name="location"
              id="location"
              value={post.location}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleSuggestions}
            className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2"
          >
            Get Suggestions
          </button>
        </form>
      </div>

      {/* Suggestions Section */}
      {suggestions && (
        <div className="w-[450px] bg-yellow-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Suggestions
          </h2>
          <div className="space-y-4">
            {Array.isArray(suggestions) ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="mb-2 flex justify-between items-center"
                >
                  <span
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: formatText(suggestion) }}
                  />
                  <button
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    onClick={() => copyToClipboard(suggestion)}
                  >
                    Copy
                  </button>
                </div>
              ))
            ) : (
              <div className="mb-2 flex justify-between items-center">
                <span
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: formatText(suggestions) }}
                />
                <button
                  className="text-blue-500 hover:text-blue-700 ml-2"
                  onClick={() => copyToClipboard(suggestions)}
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
