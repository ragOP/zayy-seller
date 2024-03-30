import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    discount_type: "percentage",
    salesprice: "",
    onsale: false,
    totalstock: "",
    instock: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Call the API to register the seller
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/seller/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Registration successful, redirect to login page or dashboard
        toast.success("Product Added", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Registration failed, handle the error
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        // You may also handle the response body for more detailed error messages
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        theme="light"
      />
      <div className="p-8 flex items-center justify-center flex-col bg-[#7d5ffe]">
        <h2 className="text-4xl font-bold mb-4 text-gray-50">Add Product</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 py-5 px-3 w-96"
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
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md py-3 px-2"
              />
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount:
              </label>
              <input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3"
              />
            </div>
            <div>
              <label
                htmlFor="discount_type"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Type:
              </label>
              <select
                id="discount_type"
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="salesprice"
                className="block text-sm font-medium text-gray-700"
              >
                Sales Price:
              </label>
              <input
                id="salesprice"
                name="salesprice"
                type="number"
                value={formData.salesprice}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="onsale"
                className="block text-sm font-medium text-gray-700"
              >
                On Sale:
              </label>
              <input
                id="onsale"
                name="onsale"
                type="checkbox"
                checked={formData.onsale}
                onChange={handleChange}
                className="ms-2 -mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="totalstock"
                className="block text-sm font-medium text-gray-700"
              >
                Total Stock:
              </label>
              <input
                id="totalstock"
                name="totalstock"
                type="number"
                value={formData.totalstock}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="instock"
                className="block text-sm font-medium text-gray-700"
              >
                In Stock:
              </label>
              <input
                id="instock"
                name="instock"
                type="number"
                value={formData.instock}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              >
                <option>Select Category</option>
                <option value="indian">Lehnga</option>
                <option value="pakistani">Kurti</option>
                <option value="suit">Suit</option>
                <option value="salwar">Salwar</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type:
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              >
                <option>Select Type</option>
                <option value="suit">Suit</option>
                <option value="shirt">Shirt</option>
                <option value="lehnga">Lehnga</option>
              </select>
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
    </>
  );
};

export default AddProduct;
