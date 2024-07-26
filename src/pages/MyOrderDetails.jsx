import React from 'react';
import { useLocation } from 'react-router-dom';

const MyOrderDetails = () => {
  const { state } = useLocation();
  const { product, address } = state || {};

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">No product data found</p>
      </div>
    );
  }

  const handleApprove = () => {
    // Add logic to approve the product
    alert('Product approved');
  };

  const handleReject = () => {
    // Add logic to reject the product
    alert('Product rejected');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          {product.productDetail.images.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {product.productDetail.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-auto max-w-xs rounded-lg shadow-md"
                />
              ))}
            </div>
          ) : (
            <img
              src="https://via.placeholder.com/400"
              alt="Placeholder"
              className="w-full h-auto max-w-xs rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="md:ml-6 w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.productDetail.name}</h1>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700 mb-2"><span className="font-medium">Description:</span> {product.productDetail.description}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Price:</span> ₹{product.productDetail.price}</p>
            {product.productDetail.onsale && (
              <p className="text-gray-700 mb-2"><span className="font-medium">Sale Price:</span> {product.productDetail.salesprice}</p>
            )}
            <p className="text-gray-700 mb-2"><span className="font-medium">Category:</span> {product.productDetail.category}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Type:</span> {product.productDetail.type}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
            {address ? (
              <>
                <p className="text-gray-700 mb-2"><span className="font-medium">Pincode:</span> {address.pincode}</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Address:</span> {address.address}</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Locality:</span> {address.localty}</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">City:</span> {address.city}</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">State:</span> {address.state}</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Address Type:</span> {address.type}</p>
              </>
            ) : (
              <p className="text-gray-700">No address information available</p>
            )}
          </div>
        </div>
      </div>
      {product.status === 'pending' && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reject
          </button>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MyOrderDetails;
