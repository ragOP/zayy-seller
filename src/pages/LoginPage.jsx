// LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../Images/Sewzeelogo..png";
// import bg from "../Images/107_generated.jpg";

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
    let loadingToastId;
    e.preventDefault();
    try {
      loadingToastId = toast.info("Logging in. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });

      const response = await fetch(
        "https://zayy-backend-1nsc.onrender.com/api/auth/sellerLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password }),
        }
      );

      console.log("Received response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log(" Data received:", data);

        localStorage.setItem("token", data.token);
console.log(data,)
        toast.update(loadingToastId, {
          render: "Login successful! Redirecting...",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        console.log("Login failed. Error message:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("Caught an error:", error.message);
      const parsedError = JSON.parse(error.message);
      console.log("Parsed error message:", parsedError.message);
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
      <div className="loginWrapper">
        <div className="loginRight" data-aos="fade-left">
          {/* <div className='loginRightContent'>
                    <p>Revolutionize Shopping:</p>
                    <h6>DISCOVER</h6>
                    <h6>LOCAL FASHION</h6>
                    <h6>GEMS</h6>
                </div> */}
        </div>
        <div className="loginLeft" data-aos="fade-right">
          <div className="loginLeftContainer">
            <div className="loginLeftInfo">
              <img src={logo} alt="sewzee Logo" />
              <div className="loginLeftTitle">
                <h6>Welcome Back to the Sewzee Seller Panel</h6>
                <p> Login and Get Started!</p>
              </div>
            </div>
            <form onSubmit={handleLogin}>
              {/* <div className="loginLeftInput">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username*"
                />
              </div> */}
              <div className="coolinput">
                <label for="input" className="text">
                  {" "}
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Enter your username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  name="input"
                  className="input"
                />
                
              </div>
              {/* <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password*"
                />
              </div> */}
              <div className="coolinput">
                <label for="input" className="text">
                  {" "}
                  Password:
                </label>
                <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 placeholder="Enter your password*"
                  name="input"
                  className="input"
                />
                
              </div>
              <button
                className="loginBtn"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Login
              </button>
              <p className="dontHaveAccount">
                Don&apos;t have an account?{" "}
                <span onClick={handleregister}>Register</span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
