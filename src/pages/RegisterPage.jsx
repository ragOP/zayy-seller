import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { sewzeeImages } from "../Images";
import sample from "../Images/bg.mp4";
const RegisterPage = () => {

  const imgRef = useRef(null);
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
    logo:null,
    upi: "",
    description: "",
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "logo" && files[0]) {
      const logoFile = files[0];
      const fileExtension = logoFile.name.split('.').pop().toLowerCase();
      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
        setFormData({ ...formData, logo: logoFile });
      } else {
        toast.error("Please upload a valid image file (JPG or PNG).");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

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
        "https://zayy-backend-1nsc.onrender.com/api/auth/sellerRegister",  
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

      <div className="OnboardingWrapper">
        <p
          className="haveAccount"
          style={{ textAlign: "right", marginRight: "100px" }}
        >
          Already a user?{" "}
          <span
            onClick={handleBack}
            style={{
              border: "1px solid #7d5ffe",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#7d5ffe",
            }}
          >
            Login
          </span>
        </p>
        <div className="OnboardingHeader">
          <div className="OnboardingHeaderContent">
            <h1>
              Tell Us About Your <span> </span>
            </h1>
            <p>We just need to know a few more things.</p>
            <div className="OnboardingHeaderDots">
              <div className="headerDots"></div>
              <div className="headerDots"></div>
              <div className="headerDots"></div>
              <div className="headerDots"></div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="OnboardingInformationWrapper">
          <div className="OnboardingGenarelInformation">
            <h6>General Information</h6>

            <div className="OnboardingInputWrapper">
              <div className="OnboardingLogoInputs">
                <img
                  src={formData?.logo ? URL.createObjectURL(formData.logo) : sewzeeImages.DummyLogo}
                  alt="logo"
                />

                <label
                  onClick={() => imgRef.current.click()}
                  className="onboardingLogoUploadBtn"
                >
                  {formData?.logo ? "Upload Again" : "Upload"}
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  ref={imgRef}
                  onChange={handleChange}
                  hidden
                />
              </div>
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
            <div className="OnboardingInputs">
              <div class>
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
            <div className="OnboardingInputs">
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
            <div className="OnboardingInputs">
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
            <div className="OnboardingInputs">
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
            <div className="OnboardingInputs">
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
            <div className="OnboardingInputs">
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
                  UPI ID:
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
              <div>
                <label
                  htmlFor="branchName"
                  className="block text-sm font-medium text-gray-750"
                >
                  Description:
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="OnboardingInputs">
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
                  <option value="brand">Brand</option>
                  <option value="boutique">Boutique</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="OnboardingBtn" style={{marginLeft:'auto'}}>
            Register & Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
