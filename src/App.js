import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./pages/AddProduct";
import RegisterPage from "./pages/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddCollection from "./pages/AddCollection";
import ProductToColl from "./pages/ProductToColl";
import AllProducts from "./pages/AllProducts";
import MyOrders from "./pages/MyOrders";
import MyOrderDetail from "./pages/MyOrderDetails";
import ProtectedRoute from "./Routes/ProtectedRoute";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AddDiscoverPost from "./pages/AddDiscoverPost";
import AllDiscoverPost from "./pages/AllDiscoverPost";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<LoginPage />} screen="login"/>} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>

          {/* <Route path="/register" element={<ProtectedRoute element={<RegisterPage />} />} /> */}
          {/* <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage/>} />} /> */}
          <Route path="/dashboard/customers" element={<ProtectedRoute element={<AddProduct />} />} />
          <Route path="/dashboard/collection" element={<ProtectedRoute element={<AddCollection />} />} />
          <Route path="/dashboard/prodtocoll" element={<ProtectedRoute element={<ProductToColl />} />} />
          <Route path="/dashboard/allproducts" element={<ProtectedRoute element={<AllProducts />} />} />
          <Route path="/dashboard/myorders" element={<ProtectedRoute element={<MyOrders />} />} />
          <Route path="/myorders/order-detail" element={<ProtectedRoute element={<MyOrderDetail />} />} />
          <Route path="/dashboard/discover" element={<ProtectedRoute element={<AddDiscoverPost />} />} />
          <Route path="/dashboard/alldiscoverpost" element={<ProtectedRoute element={<AllDiscoverPost />} />} />

        </Routes>
      </Router>
  );
}

export default App;
