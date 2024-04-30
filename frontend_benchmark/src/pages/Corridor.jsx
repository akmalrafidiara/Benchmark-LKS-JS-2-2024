import React from "react";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";

function Corridor() {
  // Get Token
  const token = localStorage.getItem("token");

  // All State Setup
  const [allCorridor, setAllCorridor] = useState(null);
  const [allBus, setAllBus] = useState(null);
  const [allDriver, setAllDriver] = useState(null);

  const [id, setId] = useState("");
  const [corridor_code, setCorridorCode] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [bus_id, setBusId] = useState("");
  const [duty_date, setDutyDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [finish_time, setFinishTime] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  error && setTimeout(() => setError(""), 3000);
  success && setTimeout(() => setSuccess(""), 3000);

  // Get Data Corridor
  const getAllCorridor = async () => {
    const url = "http://127.0.0.1:8000/v1/corridor";
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
      setAllCorridor(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
      const data = await response.json();
      setAllBus(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Get Data Driver
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
      const data = await response.json();
      setAllDriver(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Save Corridor
  const saveCorridor = async () => {
    if (isUpdate) {
      updateCorridor(id);
    } else {
      createCorridor();
    }
  };

  // Reset Form
  const resetForm = () => {
    setId("");
    setCorridorCode("");
    setDriverId("");
    setBusId("");
    setDutyDate("");
    setStartTime("");
    setFinishTime("");
    setIsUpdate(false);
  };

  // Create Corridor
  const createCorridor = async () => {
    const data = {
      corridor_code,
      driver_id,
      bus_id,
      duty_date,
      start_time,
      finish_time,
    };
    console.log(data);
    const url = "http://127.0.0.1:8000/v1/corridor";
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status === 422) {
        setError(data.message);
      }
      if (response.ok) {
        setSuccess(data.message);
        resetForm();
        getAllCorridor();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating corridor: ", error);
    }
  };

  // // Edit Corridor
  // const editCorridor = (id) => {
  //   const corridor = allCorridor.find((corridor) => corridor.id === id);
  //   setId(corridor.id);
  //   setCorridorCode(corridor.corridor_code);
  //   setDriverId(corridor.driver_id);
  //   setBusId(corridor.bus_id);
  //   setDutyDate(corridor.duty_date);
  //   setStartTime(corridor.start_time);
  //   setFinishTime(corridor.finish_time);
  //   setIsUpdate(true);
  // };

  // // Update Corridor
  // const updateCorridor = async (id) => {
  //   const data = {
  //     corridor_code,
  //     driver_id,
  //     bus_id,
  //     duty_date,
  //     start_time,
  //     finish_time,
  //   };
  //   const url = `http://127.0.0.1:8000/v1/corridor/${id}`;
  //   const options = {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     if (response.status === 422) {
  //       setError(data.message);
  //     }
  //     if (response.ok) {
  //       setSuccess(data.message);
  //       resetForm();
  //       getAllCorridor();
  //     }
  //   } catch (error) {
  //     console.error("Error updating corridor: ", error);
  //   }
  // };

  // Delete Corridor
  const deleteCorridor = async (id) => {
    const confirm = window.confirm(
      "Are you sure want to delete this corridor?"
    );
    if (!confirm) return;

    const url = `http://127.0.0.1:8000/v1/corridor/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        getAllCorridor();
      }
    } catch (error) {
      console.error("Error deleting corridor: ", error);
    }
  };

  useEffect(() => {
    getAllCorridor();
    getAllBus();
    getAllDriver();
  }, []);

  return (
    <>
      <SideBar Page="corridor" />
      <main>
        <div className="main-container">
          <div className="form-header">
            <h1>Corridor</h1>
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
                <label htmlFor="corridor_code">Corridor Code</label>
                <input
                  value={corridor_code}
                  onChange={(e) => setCorridorCode(e.target.value)}
                  type="text"
                  id="corridor_code"
                  name="corridor_code"
                />
              </div>

              <div className="row">
                <div className="form-group col-2">
                  <label htmlFor="driver_id">Driver ID</label>
                  <select
                    value={driver_id}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>
                      -- Choose Driver --
                    </option>
                    {allDriver &&
                      allDriver.map((driver) => (
                        <option value={driver.driver_id} key={driver.driver_id}>
                          {driver.driver_id} - {driver.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-2">
                  <label htmlFor="bus_id">Bus</label>
                  <select
                    value={bus_id}
                    onChange={(e) => setBusId(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>
                      -- Choose Bus --
                    </option>
                    {allBus &&
                      allBus.map((bus) => (
                        <option value={bus.id} key={bus.id}>
                          {bus.plate_number} - {bus.brand}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="duty_date">Duty Date</label>
                <input
                  value={duty_date}
                  onChange={(e) => setDutyDate(e.target.value)}
                  type="date"
                  id="duty_date"
                  name="duty_date"
                />
              </div>

              <div className="row">
                <div className="form-group col-2">
                  <label htmlFor="start_time">Start Time</label>
                  <input
                    value={start_time}
                    onChange={(e) => setStartTime(e.target.value)}
                    type="time"
                    id="start_time"
                    name="start_time"
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="finish_time">Finish Time</label>
                  <input
                    value={finish_time}
                    onChange={(e) => setFinishTime(e.target.value)}
                    type="time"
                    id="finish_time"
                    name="finish_time"
                  />
                </div>
              </div>

              <div className="form-button">
                <button
                  onClick={saveCorridor}
                  type="submit"
                  className="submit-form"
                >
                  Save Corridor
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
                  <th>Corridor Code</th>
                  <th>Driver ID</th>
                  <th>Driver Name</th>
                  <th>Plate Number</th>
                  <th>Bus Brand</th>
                  <th>Bus Type</th>
                  <th>Duty Date</th>
                  <th>Start Time</th>
                  <th>Finish Time</th>
                  <th>Duty Time in Minutes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allCorridor &&
                  allCorridor.map((corridor) => (
                    <tr key={corridor.id}>
                      <td>{corridor.corridor_code}</td>
                      <td>{corridor.driver_id}</td>
                      <td>{corridor.driver_name}</td>
                      <td>{corridor.bus_plate_number}</td>
                      <td>{corridor.bus_brand}</td>
                      <td>{corridor.bus_type}</td>
                      <td>{corridor.duty_date}</td>
                      <td>{corridor.start_time}</td>
                      <td>{corridor.finish_time}</td>
                      <td>{corridor.duty_time_in_minutes}</td>
                      <td className="table-button">
                        {/* <button className="edit">Edit</button> */}
                        <button
                          onClick={(e) => deleteCorridor(corridor.id)}
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

export default Corridor;
