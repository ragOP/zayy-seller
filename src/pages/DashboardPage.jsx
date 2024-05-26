import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import progress from "../Images/progress.gif";

function DashboardPage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div style={{ marginLeft: "220px" }}>
          <h2 className="text-center mt-3">Welcome to the Dashboard!</h2>
          <div className="flex items-center justify-center mt-16">
            <img className="w-[300px]" src={progress} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
