import React from "react";
import './App.css'
import NavComponent from "./components/NavComponent";
import { Routes, Route } from "react-router-dom"
import HomeComponent from "./components/HomeComponent"
import InfoComponent from "./components/InfoComponent";

const App = () => {
  return (
    <div className="App">
      <NavComponent />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/tietoa" element={<InfoComponent />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
