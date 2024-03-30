// LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../Images/Sewzeelogo..png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleregister = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/auth/sellerLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Welcome again! Please wait while we fetch tour data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Login failed. Please try again later.");
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
      <div className="login-page">
        <div className="container">
          <div className="left-container">
            <img className="logo" src={logo} alt="Logo" />{" "}
            {/* Insert the logo */}
            <h2>Welcome Back!</h2>
            <p>Please login to continue.</p>
            <button onClick={handleregister}>Register</button>
          </div>
          <div className="right-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
