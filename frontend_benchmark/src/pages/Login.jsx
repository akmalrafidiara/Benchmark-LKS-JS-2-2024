import React from "react";
import { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  async function Login(e) {
    e.preventDefault();
    const data = { username, password };
    const url = "http://127.0.0.1:8000/v1/auth/login";
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    const token = await response.json();
    if (response.ok) {
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
      setError(token.message);
    }
  }

  return (
    <>
      <section className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src="images/tj_logo.png" alt="Transjakarta" />
            <div>
              <h1>transjakarta</h1>
              <h6>Corridor Management System</h6>
            </div>
          </div>
          {error && (
            <div className="alert alert-danger">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={Login}>
            <div className="login-input-box">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-input-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="credit">
            <p>&copy; LKS Web Technology Jakarta Selatan II - 2024</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
