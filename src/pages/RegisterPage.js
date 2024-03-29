import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    website: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    accountNo: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountHolderName: '',
    businessType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to register the seller
      const response = await fetch('https://zayy-backend.onrender.com/api/auth/sellerRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Registration successful, redirect to login page or dashboard
        navigate('/dashboard');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', response.statusText);
        // You may also handle the response body for more detailed error messages
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Seller Registration</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Website:</label>
                <input name="website" value={formData.website} onChange={handleChange} />
              </div>
              <div>
                <label>Pincode:</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
              </div>
              <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
            <div>
              <div>
                <label>Locality:</label>
                <input type="text" name="locality" value={formData.locality} onChange={handleChange} />
              </div>
              <div>
                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div>
                <label>State:</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
              </div>
              <div>
                <label>Account Number:</label>
                <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} />
              </div>
              <div>
                <label>IFSC Code:</label>
                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
              </div>
            </div>
            <div>
              <div>
                <label>Bank Name:</label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
              </div>
              <div>
                <label>Branch Name:</label>
                <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} />
              </div>
            </div>
            <div>
              <div>
                <label>Account Holder Name:</label>
                <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
              </div>
              <div>
                <label>Business Type:</label>
                <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} />
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
