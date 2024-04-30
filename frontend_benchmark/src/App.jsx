import React from "react";
import { Routes, Route } from "react-router-dom";
import VerifyToken from "./pages/components/VerifyToken";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bus from "./pages/Bus";
import Driver from "./pages/Driver";
import Corridor from "./pages/Corridor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<VerifyToken Next={Dashboard} />}></Route>
        <Route path="/bus" element={<VerifyToken Next={Bus} />}></Route>
        <Route path="/driver" element={<VerifyToken Next={Driver} />}></Route>
        <Route
          path="/corridor"
          element={<VerifyToken Next={Corridor} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
