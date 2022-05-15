import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const logOffHandler = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <div>
      <p>Welcome Valued member! This is the home page!</p>
      <button onClick={logOffHandler}>Log off</button>
    </div>
  );
};

export default HomeScreen;
