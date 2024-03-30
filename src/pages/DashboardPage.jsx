// DashboardPage.js

import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Header from "./Header";

function DashboardPage() {
  return (
    <div>
      <Header />
      <div style={contentStyle}>
        <Sidebar /> {/* Include the Sidebar component here */}
        <div style={{ marginLeft: "220px" }}>
          {" "}
          {/* Adjust margin to accommodate the sidebar */}
          {/* Add your dashboard content here */}
          <h2 className="text-center mt-3">Welcome to the Dashboard!</h2>
        </div>
      </div>
    </div>
  );
}

const contentStyle = {
  display: "flex",
};

export default DashboardPage;
