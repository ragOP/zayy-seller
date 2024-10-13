import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const POSTS_PER_PAGE = 6 // Number of posts to display per page

const AllDiscoverPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://zayy-backend-iz7q.onrender.com/api/seller/getAllPosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (response.ok) {
          setPosts(result.data);
        } else {
          toast.error(result.message || "Failed to fetch posts");
        }
      } catch (error) {
        toast.error("Error fetching posts");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} theme="light" />
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-4 flex items-start flex-col bg-white" style={{ height: "100vh", width: "80%", marginLeft: "250px" }}>
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentPosts.map((post) => (
                <div key={post._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{post.content}</h3>
                  {post.image && (
                    <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Question: {post.poolQuestion}</h3>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Answers: {post.poolAnswers.join(" -or- ")}</h3> 
                  <p className="text-gray-600 mb-2">Total Votes: {post.totalVotes}</p>
                  <p className="text-xs text-gray-600">Likes: {post.likes.length}</p>
                  <p className="text-xs font-medium">Comments ({post.comments.length}):</p>
                  <ul className="text-xs text-gray-700 list-disc pl-4">
                    {post.comments.map((comment) => (
                      <li key={comment._id} className="text-gray-600">
                        {comment.userId.name}: {comment.comment}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No posts available</p>
          )}

          <div className="flex justify-center mt-4 " >
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`p-2 mx-1 rounded-md ${
                  currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-indigo-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllDiscoverPost;
