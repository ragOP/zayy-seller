import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


const categoriesData = [
  {
    name: "Men",
    subcategories: ["T-Shirts", "Shirts", "Jeans", "Pants", "Jackets", "Suits"],
  },
  {
    name: "Women",
    subcategories: ["Dresses", "Tops", "Skirts", "Jeans", "Outerwear", "Suits","Bags"],
  },
  {
    name: "Kids",
    subcategories: ["Boys", "Girls", "Baby", "Accessories"],
  },
  {
    name: "Footwear",
    subcategories: ["Sneakers", "Boots", "Sandals", "Flats", "Heels"],
  },
];
const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black","Purple","Girl","Brown"];
const sizeOptions = ["XS", "S", "M", "L", "XL","XXL","XXXL","One Size","6","7","8"];
const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

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
    images: [],
    description:"",
    color:[],
    size:[]
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const imagesArray = Array.from(files);
      setFormData((prevState) => ({
        ...prevState,
        [name]: imagesArray,
      }));
    } else if (type === "checkbox") {
      if (name === "color" || name === "size") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
};
  

  const handleAddImages = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    setFormData((prevState) => {
      const updatedImages = [...prevState.images];
      updatedImages.splice(index, 1);
      return {
        ...prevState,
        images: updatedImages,
      };
    });
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      category: categoryValue,
      type: "",
    }));
    setSelectedCategory(categoryValue);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      type: subcategoryValue,
    }));
    setSelectedSubcategory(subcategoryValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData();
console.log("FormData",formData)
    for (const key in formData) {
      if (key !== "images") {
        formDataForRequest.append(key, formData[key]);
      }
    }

    formData.images.forEach((image, index) => {
      formDataForRequest.append("images", image);
    });

    const token = localStorage.getItem("token");
    let loadingToastId;
    try {
      loadingToastId = toast.info("Adding Product. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const response = await fetch(
        "https://zayy-backend-iz7q.onrender.com/api/seller/addProduct",
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
          render: "Product added successfully",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeButton={false}
        theme="light"
      />
            <Header/>
      <div className="flex">
      <Sidebar/>
      <div className="p-8 flex items-center justify-center flex-col bg-[white]" style={{width:"90%",height:"auto",marginLeft:'250px'}}>
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Add Product</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 py-5 px-3 w-full max-w-7xl space-y-6 "
        >
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
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
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              >
                <option value="">Select Category</option>
                {categoriesData.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subcategory">Subcategory:</label>
              <select
                id="subcategory"
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-900 rounded-md py-3 px-2 bg-transparent"
              >
                <option value="">Select Subcategory</option>
                {selectedCategory &&
                  categoriesData
                    .find((category) => category.name === selectedCategory)
                    .subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
              </select>
              
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">
    Sizes:
  </label>
  <div className="mt-1">
    {sizeOptions.map((size) => (
      <div key={size}>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="size"
            value={size}
            checked={formData.size.includes(size)}
            onChange={handleChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <span>{size}</span>
        </label>
      </div>
    ))}
  </div>
</div>
<div>
  <label className="block text-sm font-medium text-gray-700">
    Colors:
  </label>
  <div className="mt-1">
    {colorOptions.map((color) => (
      <div key={color}>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="color"
            value={color}
            checked={formData.color.includes(color)}
            onChange={handleChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <span>{color}</span>
        </label>
      </div>
    ))}
  </div>
</div>
            <div>
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-750"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-100 shadow-sm sm:text-sm border border-gray-900 rounded-md py-2 px-1 bg-transparent"
                  />
                </div>
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images:
              </label>
              <div className="mt-1 flex">
                <button
                  type="button"
                  onClick={handleAddImages}
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Images
                </button>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              

              <div className="flex items-center space-x-3 flex-wrap">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative mt-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product"
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 bg-gray-500 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
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

export default AddProduct;
