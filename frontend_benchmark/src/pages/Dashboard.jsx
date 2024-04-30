import React from "react";
import SideBar from "./components/SideBar";

function Dashboard() {
  return (
    <>
      <SideBar Page="dashboard" />
      <main>
        <div className="hero">
          <img src="images/tj_banner.jpg" alt="" />
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1>Welcome Administrator</h1>
            <p>
              This system for driver and bus corridor management system
              <br />
              Transjakarta Indonesia.
            </p>
          </div>
        </div>
        <div className="credit">
          <p>© LKS Web Technology Jakarta Selatan II - 2024</p>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
