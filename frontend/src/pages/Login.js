import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [inpUser, setInpUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInpUser({ ...inpUser, [name]: value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, inpUser)
      .then((response) => {
        Cookie.set("accessToken", response.data.token, { expires: 1 });
        setUser(response.data.user);
        navigate("/me");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };
  useEffect(() => {
    if (user.id) {
      navigate("/me");
    }
  }, []);
  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={user.username}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChangeInput}
            value={user.password}
            placeholder="Enter password"
          />
        </div>
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;