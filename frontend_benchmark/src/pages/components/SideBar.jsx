import React from "react";

function SideBar(props) {
  const Page = props.Page;

  const logout = () => {
    const token = localStorage.getItem("token");
    const url = "http://127.0.0.1:8000/v1/auth/logout";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchLogout = async () => {
      try {
        const response = await fetch(url, options);
        if (response.status === 401) {
          localStorage.removeItem("token");
        }
        const data = await response.json();
        console.log(data);
        window.location.href = "/login";
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchLogout();
  };
  return (
    <>
      <section className="side-bar">
        <div>
          <div className="logo">
            <img src="images/tj_logo.png" alt="Transjakarta" />
            <h1>transjakarta</h1>
            <h6>Corridor Management System</h6>
          </div>
          <nav>
            <a href="/" className={Page == "dashboard" ? "active" : ""}>
              <i className="fa-solid fa-gauge"></i> Dashboard
            </a>
            <a href="/corridor" className={Page == "corridor" ? "active" : ""}>
              <i className="fa-solid fa-route"></i> Corridor
            </a>
            <a href="/bus" className={Page == "bus" ? "active" : ""}>
              <i className="fa-solid fa-bus"></i> Bus
            </a>
            <a href="/driver" className={Page == "driver" ? "active" : ""}>
              <i className="fa-solid fa-id-card"></i> Driver
            </a>
          </nav>
        </div>
        <nav>
          <a onClick={logout} className="logout">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        </nav>
      </section>
    </>
  );
}

export default SideBar;
