import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const AllProducts = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    let apiUrl = '';
    if (selectedOption === 'approve') {
      apiUrl = 'https://zayy-backend.onrender.com/api/seller/getAllProducts';
    } else if (selectedOption === 'pending') {
      apiUrl = 'https://zayy-backend.onrender.com/api/seller/getAllPendingProduct';
    }

    if (apiUrl) {
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${selectedOption} products`);
          }
          return response.json();
        })
        .then(data => {
          if (data && data.data) {
            setProducts(data.data); // Update state with fetched products
          } else {
            setError('No products found'); // Handle case where no data is returned
          }
        })
        .catch(error => {
          console.error(`Error fetching ${selectedOption} products:`, error);
          setError(`Error fetching ${selectedOption} products`);
        });
    }
  }, [selectedOption]); // Depend on selectedOption to trigger effect

  return (
    <>
    <Header/>
    <div className="flex">
      <Sidebar/>
      <div className="p-8 flex-col bg-[white]"  style={{width:"87%",height:"auto" ,marginLeft:"auto"}}      >
    <div className="overflow-x-auto">
      {error && <p className="text-red-500">{error}</p>}
      <select id="approvalDropdown"
       value={selectedOption} onChange={handleDropdownChange} 
       className="p-3 mb-6 rounded-md border border-gray-300 shadow-md text-lg"
      >
        <option value="">Select Options</option>
        <option value="approve" >Approved</option>
        <option value="pending" >Pending</option>
      </select>
      
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 border-r border-gray-200">Image</th>
            <th className="py-2 px-4 border-r border-gray-200">Name</th>
            <th className="py-2 px-4 border-r border-gray-200">Status</th>
            
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-2 px-4 border-r border-gray-200">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-full border-1 border-blue-500"
                  />
                </td>
                <td className="py-2 px-4 border-r border-gray-200">{product.name}</td>
                <td className="py-2 px-4 border-r border-gray-200 uppercase" style={{ color: product.status === 'approved' ? '#00C000' : 'red' }}>
  {product.status}
</td>         
     </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b border-gray-200 text-center" colSpan="3">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </>
  );
};

export default AllProducts;
