import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    website: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    country: "",
    accountNo: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    accountHolderName: "",
    business_type: "",
    logo: null,
    upi:"",
description:"",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const logoFile = files[0];
      setFormData({ ...formData, logo: logoFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingToastId;
    try {
      const formDataForRequest = new FormData();
      for (const key in formData) {
        formDataForRequest.append(key, formData[key]);
      }
      // Call the API to register the seller
      loadingToastId = toast.info("Logging in. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/auth/sellerRegister",
        {
          method: "POST",
          body: formDataForRequest,
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.update(loadingToastId, {
          render: "Welcome on board! Please wait while we fetch your details!",
          type: "success",
          autoClose: 2000,
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
      console.log("formData", formData);
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      console.log("Error message:", parsedError.message);
      toast.update(loadingToastId, {
        render: parsedError.message,
        type: "error",
        autoClose: 2000,
      });
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
      <div className="bg-[#7d5ffe] py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-50">
            Seller Registration
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 px-8 py-5 min-w-fit"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Password:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Website:
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Pincode:
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="locality"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Locality:
                  </label>
                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={formData.locality}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-750"
                  >
                    City:
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-750"
                  >
                    State:
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Country:
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="accountNo"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Account Number:
                  </label>
                  <input
                    id="accountNo"
                    name="accountNo"
                    type="text"
                    value={formData.accountNo}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ifscCode"
                    className="block text-sm font-medium text-gray-750"
                  >
                    IFSC Code:
                  </label>
                  <input
                    id="ifscCode"
                    name="ifscCode"
                    type="text"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Bank Name:
                  </label>
                  <input
                    id="bankName"
                    name="bankName"
                    type="text"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="branchName"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Branch Name:
                  </label>
                  <input
                    id="branchName"
                    name="branchName"
                    type="text"
                    value={formData.branchName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                   <div>
                  <label
                    htmlFor="branchName"
                    className="block text-sm font-medium text-gray-750"
                  >
                    upi:
                  </label>
                  <input
                    id="upi"
                    name="upi"
                    type="text"
                    value={formData.upi}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="accountHolderName"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Account Holder Name:
                  </label>
                  <input
                    id="accountHolderName"
                    name="accountHolderName"
                    type="text"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="business_type"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Business Type:
                  </label>
                  <select
                    id="business_type"
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-300 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-2.5 px-2 bg-transparent"
                  >
                    <option value="brand">brand</option>
                    <option value="boutique">boutique</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-750"
                >
                  Image:
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
