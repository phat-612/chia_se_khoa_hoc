import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inpProfile, setInpProfile] = useState({
    fullname: user.fullname,
    email: user.email,
    avatar: null,
    avatarPreview: user.avatar,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setInpProfile({
      fullname: user.fullname || "",
      email: user.email || "",
      avatar: null,
      avatarPreview: user.avatar || "",
    });
  }, [user]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === "avatar") {
      setInpProfile({
        ...inpProfile,
        [name]: event.target.files[0],
        avatarPreview: URL.createObjectURL(event.target.files[0]),
      });
      return;
    }
    setInpProfile({ ...inpProfile, [name]: value });
  };
  const handleCancel = () => {
    setIsEdit(false);
    setInpProfile({
      fullname: user.fullname,
      email: user.email,
      avatar: null,
      avatarPreview: "",
    });
  };
  const isVaildForm = () => {
    if (!inpProfile.fullname || !inpProfile.email) {
      setError("Please enter all fields");
      return false;
    }
    if (!inpProfile.email.includes("@")) {
      setError("Invalid email");
      return false;
    }
    setError("");
    return true;
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (!isVaildForm()) return;
    const formData = new FormData();
    formData.append("fullname", inpProfile.fullname);
    formData.append("email", inpProfile.email);
    // formData.append("avatar", inpProfile.avatar);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/update-info-user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookie.get("accessToken")}`,
        },
      })
      .then((response) => {
        setError("");
        setIsEdit(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    // sau khi gọi api cập nhật thành công
  };
  return !isEdit ? (
    <div>
      <div className="container mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  className="rounded-circle mb-3"
                  alt="Avatar"
                />
                <h5 className="card-title">{user.fullname}</h5>
                <p className="card-text">{user.email}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3 text-center">
                    <img
                      src={
                        inpProfile.avatarPreview ||
                        "https://via.placeholder.com/150"
                      }
                      className="rounded-circle mb-3"
                      alt="Avatar"
                      width="150"
                      height="150"
                    />
                    <input
                      type="file"
                      className="form-control"
                      name="avatar"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullname"
                      onChange={handleChangeInput}
                      value={inpProfile.fullname}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChangeInput}
                      value={inpProfile.email}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="d-flex flex-row-reverse gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmitEdit}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
