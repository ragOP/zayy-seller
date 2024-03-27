// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddProduct from './pages/AddProduct'
import RegisterPage from './RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage/>}/>

        <Route path="/dashboard/customers" element={<AddProduct />} />
 
      </Routes>
    </Router>
  );
}

export default App;
