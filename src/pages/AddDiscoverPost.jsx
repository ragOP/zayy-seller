import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AddDiscoverPost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    image: null,
    content: '',
    poolQuestion: '',
    poolAnswerFirst: '',
    poolAnswerSecond: '',
    isPool: false,
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      const file = files[0];
   
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        setFormData((prevState) => ({ ...prevState, [name]: file }));
      } else {
        toast.error("Please upload a valid image (PNG or JPG)");
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleCheckboxChange = () => {
    setFormData((prevState) => ({ ...prevState, isPool: !prevState.isPool }));
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setFormData((prevState) => ({ ...prevState, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    
    for (const key in formData) {
      if (formData[key] || formData[key] === false) { 
        dataToSend.append(key, formData[key]);
      }
    }

    const token = localStorage.getItem("token");
    let loadingToastId;
    try {
      loadingToastId = toast.info("Adding Post. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
      });

      const response = await fetch("https://zayy-backend-iz7q.onrender.com/api/seller/addPost", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });
      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        toast.update(loadingToastId, {
          render: "Post added successfully",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error(JSON.stringify(responseData));
      }
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      console.error("Error:", parsedError); 
      toast.update(loadingToastId, {
        render: parsedError.message,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} theme="light" />
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-8 flex flex-col items-center bg-gray-50" style={{ height: "100vh", width: "90%",marginLeft:'250px' }}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Discover Post</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Discover Image:</label>
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-200 ease-in-out"
                >
                  Add Image
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>

              {formData.image && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Product"
                    className="h-32 w-32 object-cover rounded-md border border-gray-300 shadow-md mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-700"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Caption:</label>
              <input
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                rows="4"
                placeholder="Enter your post caption here..."
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={formData.isPool}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="block text-sm font-medium text-gray-700">
                Is this a poll?
              </label>
            </div>

            {formData.isPool && (
              <>
                <div className="mb-4">
                  <label htmlFor="poolQuestion" className="block text-sm font-medium text-gray-700 mb-2">Poll Question:</label>
                  <input
                    type="text"
                    id="poolQuestion"
                    name="poolQuestion"
                    value={formData.poolQuestion}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poll Answers:</label>
                  <input
                    type="text"
                    name="poolAnswerFirst"
                    value={formData.poolAnswerFirst}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500 mb-2"
                    placeholder="First Answer"
                  />
                  <input
                    type="text"
                    name="poolAnswerSecond"
                    value={formData.poolAnswerSecond}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    placeholder="Second Answer"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDiscoverPost;
