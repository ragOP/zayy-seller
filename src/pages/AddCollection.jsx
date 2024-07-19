import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AddCollection = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData();

    for (const key in formData) {
      if (key !== "image") {
        formDataForRequest.append(key, formData[key]);
      }
    }

    if (formData.image) {
      formDataForRequest.append("image", formData.image);
    }

    const token = localStorage.getItem("token");
    let loadingToastId;
    try {
      loadingToastId = toast.info("Adding Product. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
      });

      const response = await fetch(
        "https://zayy-backend.onrender.com/api/seller/collection",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataForRequest,
        }
      );

      if (response.ok) {
        toast.update(loadingToastId, {
          render: "Collection added successfully",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorMessage = await response.json();
        throw new Error(JSON.stringify(errorMessage));
      }
    } catch (error) {
      console.error("Error details:", error.message);
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
      <Header/>
      <div className="flex">
      <Sidebar/>
            <div className="p-8 flex items-center  flex-col bg-[white]" style={{height:"100vh",width:'90%'}}>
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Add Collection</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 py-5 px-3 min-w-fit"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md py-3 px-2"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image:
              </label>
              <div className="mt-1 flex">
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Product"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 right-0 bg-gray-500 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default AddCollection;
