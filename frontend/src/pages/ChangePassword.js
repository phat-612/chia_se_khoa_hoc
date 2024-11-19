import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const ChangePassword = () => {
  const [inpChangePassword, setInpChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const [error, setError] = useState("");

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInpChangePassword({ ...inpChangePassword, [name]: value });
  };
  const validForm = () => {
    if (
      !inpChangePassword.oldPassword ||
      !inpChangePassword.newPassword ||
      !inpChangePassword.rePassword
    ) {
      setError("Vui lòng nhập đủ thông tin");
      return false;
    }
    if (inpChangePassword.newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (inpChangePassword.newPassword !== inpChangePassword.rePassword) {
      setError("Mật khẩu không khớp");
      return false;
    }
    setError("");
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validForm()) return;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/update-password`,
        inpChangePassword,
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setError("");
      })
      .catch((error) => {
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
          <label htmlFor="oldPassword" className="form-label">
            Nhập mật khẩu cũ
          </label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            name="oldPassword"
            onChange={handleChangeInput}
            value={inpChangePassword.oldPassword}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nhập mật khẩu mới
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            onChange={handleChangeInput}
            value={inpChangePassword.newPassword}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmNewPassword"
            name="rePassword"
            onChange={handleChangeInput}
            value={inpChangePassword.rePassword}
          />
        </div>
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Lưu mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
