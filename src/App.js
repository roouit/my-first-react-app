import React from "react";
import './App.css'
import NavComponent from "./components/NavComponent";
import { Routes, Route } from "react-router-dom"
import HomeComponent from "./components/HomeComponent"

const App = () => {
  return (
    <div className="App">
      <NavComponent />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
