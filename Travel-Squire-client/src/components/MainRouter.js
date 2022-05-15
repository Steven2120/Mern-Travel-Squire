import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./Signup/RegisterScreen";
import LoginScreen from "./Login/LoginScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const MainRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default MainRouter;
