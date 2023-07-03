import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import BankModule from "./components/BankModule";
import setupProxy from "./setupProxy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/BankModule" element={<BankModule />} />
    </Routes>
  );
}

export default App;
