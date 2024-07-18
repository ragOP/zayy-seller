import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const CollectionDropdown = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    fetch('https://zayy-backend.onrender.com/api/seller/collection', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.collection) {
          setCollections(data.collection);
        } else {
          console.error('Invalid API response:', data);
          setError(data.message || 'Invalid API response');
        }
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
        setError('Error fetching collections');
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    fetch('https://zayy-backend.onrender.com/api/seller/getAllProducts', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setProducts(data.data);
        } else {
          console.error('Invalid API response:', data);
          setError(data.message || 'Invalid API response');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      });
  }, []);

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const handleCheckboxChange = (event, productId) => {
    setSelectedProducts(prevState => ({
      ...prevState,
      [productId]: event.target.checked,
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header/>
      <div className="flex">
        <Sidebar/>
        <div className="p-8 flex-col bg-[#7d5ffe]" style={{ height: "100vh", width: '90%' }}>
          <select
            className="p-3 mb-6 rounded-md border border-gray-300 shadow-md text-lg"
            value={selectedCollection}
            onChange={handleCollectionChange}
          >
            <option value="">Select a Collection</option>
            {collections.length > 0 ? (
              collections.map((collection) => (
                <option key={collection._id} value={collection.name}>
                  {collection.name}
                </option>
              ))
            ) : (
              <option disabled>Loading collections...</option>
            )}
          </select>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Select</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={!!selectedProducts[product._id]}
                        onChange={(event) => handleCheckboxChange(event, product._id)}
                      />
                    </td>
                    <td className="py-2 px-4 border-b" >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-full border-1 border-blue-500"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b" colSpan="3">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className="bg-black-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Selected Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionDropdown;
