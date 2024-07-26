import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MyOrders = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    if (selectedOption === 'cancel') {
      apiUrl = 'https://zayy-backend.onrender.com/api/seller/cancelOrder';
    } else if (selectedOption === 'pending') {
      apiUrl = 'https://zayy-backend.onrender.com/api/seller/pendingOrders';
    }

    if (apiUrl) {
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${selectedOption} orders`);
          }
          return response.json();
        })
        .then(data => {
          if (data && data.data) {
            setOrders(data.data); // Update state with fetched orders
          } else {
            setError('No orders found'); // Handle case where no data is returned
          }
        })
        .catch(error => {
          console.error(`Error fetching ${selectedOption} orders:`, error);
          setError(`Error fetching ${selectedOption} orders`);
        });
    }
  }, [selectedOption]); // Depend on selectedOption to trigger effect

  const groupOrdersByOrderId = (orders) => {
    return orders.reduce((acc, order) => {
      if (!acc[order.orderId]) {
        acc[order.orderId] = [];
      }
      acc[order.orderId].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByOrderId(orders);

  const handleViewDetails = (product, address, status) => {
    navigate('/myorders/order-detail', { state: { product, address, status } });
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-8 flex-col bg-[white]" style={{ height: "100vh", width: '90%' }}>
          <div className="overflow-x-auto">
            {error && <p className="text-red-500">{error}</p>}
            <select
              id="approvalDropdown"
              value={selectedOption}
              onChange={handleDropdownChange}
              className="p-3 mb-6 rounded-md border border-gray-300 shadow-md text-lg"
            >
              <option value="">Select Option</option>
              <option value="cancel">Cancelled</option>
              <option value="pending">Pending</option>
            </select>

            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-2 px-4 border-r border-gray-200">Order ID</th>
                  <th className="py-2 px-4 border-r border-gray-200">Products</th>
                  <th className="py-2 px-4 border-r border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedOrders).length > 0 ? (
                  Object.keys(groupedOrders).map((orderId) => (
                    <tr key={orderId} className="border-b border-gray-200">
                      <td className="py-2 px-4 border-r border-gray-200">{orderId}</td>
                      <td className="py-2 px-4 border-r border-gray-200">
                        {groupedOrders[orderId].map((order) => (
                          <div key={order._id}>
                            <table className="min-w-full bg-white border-collapse border border-gray-200 mb-2">
                              <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                  <th className="py-2 px-4 border-r border-gray-200">Product Name</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Quantity</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Color</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Size</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.products.map((product) => (
                                  <tr key={product._id} className="border-b border-gray-200">
                                    <td className="py-2 px-4 border-r border-gray-200">{product.productDetail.name}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.quantity}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.colorname}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.size}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">
                                      <button
                                        onClick={() => handleViewDetails(product, order.address, order.status)}
                                        className="bg-blue-800 text-white p-2 rounded"
                                      >
                                        View 
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </td>
                      <td
                        className="py-2 px-4 border-r border-gray-200 uppercase"
                        style={{ color: groupedOrders[orderId][0].status === 'pending' ? 'orange' : 'red' }}
                      >
                        {groupedOrders[orderId][0].status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200 text-center" colSpan="4">
                      No orders available
                    </td>
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

export default MyOrders;
