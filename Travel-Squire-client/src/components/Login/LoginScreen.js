import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginScreen.css";
import { set } from "mongoose";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login__container">
      <form className="login__form">
        <h3 className="login__title">Login</h3>

        <div className="form__group">
          <label htmlFor="email" className="login__label">
            Email:
          </label>
          <input
            type="text"
            required
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>

        <div className="form__group">
          <label htmlFor="password" className="login__label">
            Password:
          </label>
          <input
            type="text"
            required
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => e.target.value}
          />

          <div className="login__btn__div">
            <button className="login__btn">Login</button>
          </div>
        </div>

        <span className="not__registered">
          Don't have an account?{" "}
          <Link className="register__link" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
