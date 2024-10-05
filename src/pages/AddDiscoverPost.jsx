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
    question: '',
    options: ['', ''], // Two empty options
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prevState) => ({ ...prevState, options: updatedOptions }));
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setFormData((prevState) => ({ ...prevState, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(option => formDataForRequest.append(`${key}[]`, option));
        } else {
          formDataForRequest.append(key, formData[key]);
        }
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
        body: formDataForRequest,
      });

      if (response.ok) {
        toast.update(loadingToastId, {
          render: "Post added successfully",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const errorMessage = await response.json();
        throw new Error(JSON.stringify(errorMessage));
      }
    } catch (error) {
      const parsedError = JSON.parse(error.message);
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
        <div className="p-8 flex flex-col items-center bg-gray-50" style={{ height: "100vh", width: "90%" }}>
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
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">Question:</label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Options:</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500 mb-2"
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>

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
