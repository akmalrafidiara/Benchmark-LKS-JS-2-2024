import React from "react";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";

function Driver() {
  // Get Token
  const token = localStorage.getItem("token");

  // All State Setup
  const [allDriver, setAllDriver] = useState(null);

  const [driver_id, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  error && setTimeout(() => setError(""), 3000);
  success && setTimeout(() => setSuccess(""), 3000);

  // Get All Driver
  const getAllDriver = async () => {
    const url = "http://127.0.0.1:8000/v1/driver";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      setIsLoading(false);
      const data = await response.json();
      setAllDriver(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Save Driver
  const saveDriver = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      updateDriver(driver_id);
      return;
    } else {
      createDriver();
    }
  };

  // Reset Form
  const resetForm = () => {
    setDriverId("");
    setName("");
    setAge("");
    setGender("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
  };

  // Create Driver
  const createDriver = async () => {
    const data = {
      driver_id,
      name,
      age,
      gender,
      phone_number,
      email,
      address,
    };
    console.log(data);
    const url = "http://127.0.0.1:8000/v1/driver";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status === 422) {
        setError(data.message);
      }
      if (response.ok) {
        setSuccess(data.message);
        resetForm();
        getAllDriver();
      }
    } catch (error) {
      console.error("Error creating driver: ", error);
    }
  };

  // Edit Driver
  const editDriver = (driver) => {
    setDriverId(driver.driver_id);
    setName(driver.name);
    setAge(driver.age);
    setGender(driver.gender);
    setPhoneNumber(driver.phone_number);
    setEmail(driver.email);
    setAddress(driver.address);
    setIsUpdate(true);
  };

  // Update Driver
  const updateDriver = async (id) => {
    const data = {
      driver_id,
      name,
      age,
      gender,
      phone_number,
      email,
      address,
    };
    const url = `http://127.0.0.1:8000/v1/driver/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status === 422) {
        setError(data.message);
      }
      if (response.ok) {
        setSuccess(data.message);
        resetForm();
        setIsUpdate(false);
        getAllDriver();
      }
    } catch (error) {
      console.error("Error updating driver: ", error);
    }
  };

  // Delete Driver
  const deleteDriver = async (id) => {
    const confirm = window.confirm("Are you sure want to delete this driver?");
    if (!confirm) return;

    const url = `http://127.0.0.1:8000/v1/driver/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        getAllDriver();
      }
    } catch (error) {
      console.error("Error deleting driver: ", error);
    }
  };

  // Call For The First Time
  useEffect(() => {
    getAllDriver();
  }, []);
  return (
    <>
      <SideBar Page="driver" />
      <main>
        <div className="main-container">
          <div className="form-header">
            <h1>Driver</h1>
            <p>Management System</p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-box">
              <div className="row">
                <div className="form-group col-2">
                  <label htmlFor="driver_id">Driver ID</label>
                  <input
                    value={driver_id}
                    onChange={(e) => setDriverId(e.target.value)}
                    type="text"
                    id="driver_id"
                    name="driver_id"
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="name">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-2">
                  <label htmlFor="age">Age</label>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="text"
                    id="age"
                    name="age"
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="gender">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>
                      -- Select Gender --
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-2">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    id="phone_number"
                    name="phone_number"
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  id="address"
                  name="address"
                />
              </div>

              <div className="form-button">
                <button
                  onClick={saveDriver}
                  type="submit"
                  className="submit-form"
                >
                  Save Driver
                </button>
                <button onClick={resetForm} className="reset-form">
                  Reset
                </button>
              </div>
            </div>
          </form>

          <div className="table-box">
            <table>
              <thead>
                <tr>
                  <th>Driver ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allDriver &&
                  allDriver.map((driver) => (
                    <tr key={driver.driver_id}>
                      <td>{driver.driver_id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.gender}</td>
                      <td>{driver.phone_number}</td>
                      <td>{driver.email}</td>
                      <td>{driver.address}</td>
                      <td className="table-button">
                        <button
                          onClick={() => editDriver(driver)}
                          className="edit"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          onClick={() => deleteDriver(driver.driver_id)}
                          className="delete"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="loading">
                <img src="/images/loading.gif" alt="loading" />
              </div>
            )}
          </div>
        </div>
        <div className="credit">
          <p>© LKS Web Technology Jakarta Selatan II - 2024</p>
        </div>
      </main>
    </>
  );
}

export default Driver;
