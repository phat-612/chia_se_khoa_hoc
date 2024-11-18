import React, { useState } from "react";

const ChangePassword = () => {
  const [inpChangePassword, setInpChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInpChangePassword({ ...inpChangePassword, [name]: value });
  };
  const [error, setError] = useState("");
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
          <p style={{ color: "red" }}></p>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Lưu mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
