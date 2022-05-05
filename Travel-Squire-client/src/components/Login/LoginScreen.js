import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../Utils/Axios";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await Axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={loginHandler}>
        <h3 className="login__title">Login</h3>
        {error && <span className="error__message">{error}</span>}
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
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login__btn__div">
            <button type="submit" className="login__btn">
              Login
            </button>
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

export default LoginScreen;
