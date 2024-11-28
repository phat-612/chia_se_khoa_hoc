import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inpRegister, setInpRegister] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
    fullname: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInpRegister({ ...inpRegister, [name]: value });
  };
  const validForm = () => {
    if (
      !inpRegister.username ||
      !inpRegister.password ||
      !inpRegister.rePassword ||
      !inpRegister.email ||
      !inpRegister.fullname
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    if (inpRegister.password.length < 6) {
      setError("Vui lòng nhập mật khẩu ít nhất 6 ký tự");
      return false;
    }
    if (!inpRegister.email.includes("@")) {
      setError("Email không hợp lệ");
      return false;
    }
    if (inpRegister.fullname.length < 6) {
      setError("Vui lòng nhập họ tên ít nhất 6 ký tự");
      return false;
    }
    if (inpRegister.password !== inpRegister.rePassword) {
      setError("Mật khẩu không khớp");
      return false;
    }
    setError("");
    return true;
  };
  const handleRegister = (event) => {
    event.preventDefault();
    // nếu input rỗng thì return
    if (!validForm()) return;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, inpRegister)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
      });
  };
  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChangeInput}
            value={inpRegister.email}
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
            value={inpRegister.fullname}
            placeholder="Nhập họ và tên"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Tài khoản
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={inpRegister.username}
            placeholder="Nhập tài khoản"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChangeInput}
            value={inpRegister.password}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="rePassword"
            name="rePassword"
            onChange={handleChangeInput}
            value={inpRegister.rePassword}
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
