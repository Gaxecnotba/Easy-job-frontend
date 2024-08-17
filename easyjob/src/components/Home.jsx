import { useAuth } from "../context/authContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { FaLocationDot } from "react-icons/fa6";
import { format } from "date-fns";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user, loading } = useAuth();

  console.log(user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/jobs");
        setPosts(response.data.jobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return format(date, "PPP");
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex justify-center items-center h-screen p-4 ">
      {/* Columna izquierda con todos los posts */}
      <div className="flex space-x-2">
        <div className="w-[400px] h-[800px] p-4 rounded-lg overflow-y-auto">
          <h2 className="text-md font-semibold px-10 mb-4">Published Posts</h2>
          {posts.map((post) => (
            <div
              key={post.uid}
              className="cursor-pointer py-4 px-4 mb-3 border-2 hover:border-gray-400 hover:shadow-md hover:shadow-green-300 rounded w-[360px] h-[250px] bg-white flex flex-col justify-between"
              onClick={() => handlePostClick(post)}
            >
              <div className="text-lg font-bold text-gray-700">
                <h3>{post.title}</h3>
              </div>
              <div className="text-sm text-gray-600">
                <p>{`${post.description.slice(0, 175)}...`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  <FaLocationDot className="mr-1" />
                  {post.job_location}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna derecha con el post seleccionado */}
        <div className="w-[700px] p-4 bg-white rounded-lg shadow-lg">
          {selectedPost ? (
            <Card job={selectedPost} showApply={true} />
          ) : (
            <div className="text-gray-500 text-center">
              Select a post to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
