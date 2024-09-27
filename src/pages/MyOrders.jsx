import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { createShiprocketOrder } from '../utils/shiprocketApi'; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    const apiUrl = 'https://zayy-backend.onrender.com/api/seller/approvedOrders';

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Approved orders');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setOrders(data.data);
        } else {
          setError('No orders found');
        }
      })
      .catch((error) => {
        console.error('Error fetching Approved orders:', error);
        setError('Error fetching Approved orders');
      });
  }, []);

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

  const handleCreateShiprocketOrder = async (order) => {
    const orderData = {
      order_id: order.orderId,
      order_date: '06/08/2024',
      pickup_location: 'Primary',
      billing_customer_name: 'Sayem',
      billing_last_name: 'Kalim',
      billing_address: order.address.address,
      billing_city: order.address.city,
      billing_pincode:order.address.pincode,
      billing_state: order.address.state,
      billing_country: 'India',
      billing_email: 'sayem@gmail.com',
      billing_phone: '8484848460',
      shipping_is_billing: true,
      order_items: order.products.map((product) => ({
        name: product.productDetail.name,
        sku: '2',
        units: product.quantity,
        selling_price: product.productDetail.price,
      })),
      payment_method: 'Prepaid',
      sub_total: order.amount,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
    };

    try {
      const response = await createShiprocketOrder(orderData);
      console.log('Shiprocket Order Response:', response);
    } catch (error) {
      console.error('Error creating Shiprocket order:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-8 flex-col bg-[white]"  style={{width:"87%",height:"auto" ,marginLeft:"auto"}}>

          <div className="overflow-x-auto">
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-2 px-4 border-r border-gray-200">Products</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedOrders).length > 0 ? (
                  Object.keys(groupedOrders).map((orderId) => (
                    <tr key={orderId} className="border-b border-gray-200">
                      <td className="py-2 px-4 border-r border-gray-200">
                        {groupedOrders[orderId].map((order) => (
                          <div key={order._id}>
                            <table className="min-w-full bg-white border-collapse border border-gray-200 mb-2">
                              <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                  <th className="py-2 px-4 border-r border-gray-200">Order ID</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Product Image</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Product Name</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Quantity</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Color</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Size</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Action</th>
                                  <th className="py-2 px-4 border-r border-gray-200">Shiprocket</th>
                                  {/* <th className="py-2 px-4 border-r border-gray-200">Status</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {order.products.map((product) => (
                                  <tr key={product._id} className="border-b border-gray-200">
                                    <td className="py-2 px-4 border-r border-gray-200">{orderId}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">
                                      <img
                                        src={product.productDetail.images[0]}
                                        alt={product.productDetail.name}
                                        className="h-16 w-16 object-cover"
                                      />
                                    </td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.productDetail.name}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.quantity}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.colorname}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">{product.size}</td>
                                    <td className="py-2 px-4 border-r border-gray-200">
                                      <button
                                        onClick={() => handleViewDetails(product, order.address, order.status)}
                                        className="bg-blue-800 text-white p-2 rounded ml-2"
                                      >
                                        View
                                      </button>
                                     
                                    </td>
                                    <td className="py-2 px-4 border-r border-gray-200">

                                    <button
                                        onClick={() => handleCreateShiprocketOrder(order)}
                                        className="bg-green-500 text-white p-2 rounded ml-2"
                                      >
                                        Create  Order
                                      </button>
                                      </td>

                                    {/* <td
                                      className="py-2 px-4 border-r border-gray-200 uppercase"
                                      style={{
                                        color: groupedOrders[orderId][0].status === 'approved' ? 'green' : 'red',
                                      }}
                                    >
                                      {groupedOrders[orderId][0].status}
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
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
