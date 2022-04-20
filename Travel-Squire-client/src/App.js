import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen";
import Counter from "./Pages/CounterAddScreen";
import Division from "./Pages/Division";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add" element={<Counter />} />
        <Route path="/div" element={<Division />} />
      </Routes>
    </Router>
  );
}

export default App;
