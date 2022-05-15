import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Passwords do not match");
    }

    try {
      await axios.post(
        "http://localhost:3001/api/user/register",
        { firstName, lastName, username, email, password },
        config
      );

      navigate("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={registerHandler}>
        <h3 className="register__title">Register</h3>
        {error && <span className="error__message">{error}</span>}
        <div className="form__group">
          <label htmlFor="firstname" className="register__label">
            First name:
          </label>
          <input
            type="text"
            required
            id="firstname"
            placeholder="Please enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="lastname" className="register__label">
            Last name:
          </label>
          <input
            type="text"
            required
            id="lastname"
            placeholder="Please enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="username" className="register__label">
            Username:
          </label>
          <input
            type="text"
            required
            id="username"
            placeholder="Please enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="email" className="register__label">
            Email:
          </label>
          <input
            type="text"
            required
            id="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="password" className="register__label">
            Password:
          </label>
          <input
            type="text"
            required
            id="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="confirmpassword" className="register__label">
            Confirm Password:
          </label>
          <input
            type="text"
            required
            id="confirmpassword"
            placeholder="Please reenter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="register__btn__div">
          <button className="register__btn">Register</button>
        </div>

        <div className="already__div">
          <p className="already">
            Already have an account?
            <Link className="to__login" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
