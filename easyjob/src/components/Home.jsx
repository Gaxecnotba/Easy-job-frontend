import { useAuth } from "../context/authContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user, loading } = useAuth();

  console.log(user);

  useEffect(() => {
    // Obtener todos los posts de la API
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex justify-center items-center h-screen p-4 ">
      {/* Columna izquierda con todos los posts */}
      <div className="flex space-x-4">
        <div className="w-[400px] bg-gray-100 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">All Posts</h2>
          {posts.map((post) => (
            <div
              key={post.title}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
              onClick={() => handlePostClick(post)}
            >
              <h3 className="text-md font-medium">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.location}</p>
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
