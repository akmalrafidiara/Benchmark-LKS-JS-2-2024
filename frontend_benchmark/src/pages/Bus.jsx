import React from "react";
import SideBar from "./components/SideBar";
import { useState, useEffect } from "react";

function Bus() {
  // Get Token
  const token = localStorage.getItem("token");

  // All State Setup
  const [allBus, setAllBus] = useState(null);

  const [id, setId] = useState("");
  const [plate_number, setPlateNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [type, setType] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  error && setTimeout(() => setError(""), 3000);
  success && setTimeout(() => setSuccess(""), 3000);

  // Get Data Bus
  const getAllBus = async () => {
    const url = "http://127.0.0.1:8000/v1/bus";
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
      setAllBus(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Save Bus
  const saveBus = async () => {
    if (isUpdate) {
      updateBus(id);
    } else {
      createBus();
    }
  };

  // Reset Form
  const resetForm = () => {
    setId("");
    setPlateNumber("");
    setBrand("");
    setFuel("");
    setType("");
    setIsUpdate(false);
  };

  // Create Bus
  const createBus = async () => {
    const data = { plate_number, brand, fuel, type };
    const url = "http://127.0.0.1:8000/v1/bus";
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
        getAllBus();
      }
    } catch (error) {
      console.error("Error creating driver: ", error);
    }
  };

  // Edit Bus
  const editBus = (id) => {
    const bus = allBus.find((bus) => bus.id === id);
    setId(bus.id);
    setPlateNumber(bus.plate_number);
    setBrand(bus.brand);
    setFuel(bus.fuel);
    setType(bus.type);
    setIsUpdate(true);
  };

  // Update Bus
  const updateBus = async (id) => {
    const data = { plate_number, brand, fuel, type };
    const url = `http://127.0.0.1:8000/v1/bus/${id}`;
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
        getAllBus();
      }
    } catch (error) {
      console.error("Error updating driver: ", error);
    }
  };

  // Delete Bus
  const deleteBus = async (id) => {
    const confirm = window.confirm("Are you sure want to delete this bus?");
    if (!confirm) return;

    const url = `http://127.0.0.1:8000/v1/bus/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        getAllBus();
      }
    } catch (error) {
      console.error("Error deleting driver: ", error);
    }
  };

  useEffect(() => {
    getAllBus();
  }, []);
  return (
    <>
      <SideBar Page="bus" />
      <main>
        <div className="main-container">
          <div className="form-header">
            <h1>Bus</h1>
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
              <div className="form-group">
                <label htmlFor="plate_number">Plate Number</label>
                <input
                  type="text"
                  id="plate_number"
                  name="plate_number"
                  value={plate_number}
                  onChange={(e) => setPlateNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <select
                  className="form-control"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose Bus --
                  </option>
                  <option value="mercedes">Mercedes</option>
                  <option value="scania">Scania</option>
                  <option value="volvo">Volvo</option>
                  <option value="zhongtong">Zhongtong</option>
                  <option value="hino">Hino</option>
                  <option value="byd">BYD</option>
                  <option value="sag">SAG</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fuel">Fuel</label>
                <select
                  className="form-control"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose Fuel --
                  </option>
                  <option value="petrol">Petrol</option>
                  <option value="gas">Gas</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose Type --
                  </option>
                  <option value="small">Small</option>
                  <option value="big">Big</option>
                  <option value="articulated">Articulated</option>
                </select>
              </div>
              <div className="form-button">
                <button onClick={saveBus} className="submit-form">
                  Save Bus
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
                  <th>Plate Number</th>
                  <th>Brand</th>
                  <th>Fuel</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBus &&
                  allBus.map((bus) => (
                    <tr key={bus.id}>
                      <td>{bus.plate_number}</td>
                      <td>{bus.brand}</td>
                      <td>{bus.fuel}</td>
                      <td>{bus.type}</td>
                      <td className="table-button">
                        <button
                          className="edit"
                          onClick={() => editBus(bus.id)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          className="delete"
                          onClick={() => deleteBus(bus.id)}
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

export default Bus;
