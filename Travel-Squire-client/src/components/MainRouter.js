import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Signup from "./Signup/RegisterScreen";
import Login from "./Login/LoginScreen";

const MainRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default MainRouter;
