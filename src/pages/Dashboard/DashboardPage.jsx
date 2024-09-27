import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Dashboard.css"
function DashboardPage() {
  return (
    <div>
      <Header />
      <div className="flex fixed">
        <Sidebar />
        <div className="dashboardTopBar">
        <div className='dashboardTopTitle' >
        
                <h6><span>Hey <b>Seller</b>  ,</span> Welcome to Sewzee Seller Panel</h6>
            </div>
            </div>

                      <div className="flex items-center justify-center mt-16">
            {/* <img className="w-[300px]" src={progress} alt="" /> */}
        </div>
      </div>
      
    </div>
  );
}

export default DashboardPage;
