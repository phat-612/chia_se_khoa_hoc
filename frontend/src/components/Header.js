import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Cookie from "js-cookie";
import axios from "axios";

const Header = ({ listNav }) => {
  const defaultNav = [];
  listNav = listNav || [];
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);
  const handleLogout = () => {
    Cookie.remove("accessToken");
    setUser({});
    axios.get(`${process.env.REACT_APP_API_URL}/api/logout`);
    navigate("/");
  };

  if (loading) {
    return <div>Không có header</div>; // Hiển thị màn hình chờ
  }
  return (
    <header
      className="p-3 mb-5 bg-light border-bottom position-fixed top-0 start-0 w-100"
      style={{ zIndex: 999 }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none "
          >
            Trang Chủ
          </Link>
          <Link
            to="/courses"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none mx-3"
          >
            Khóa Học
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {listNav.map((nav) => (
              <Link className="nav-link px-2 link-dark text-decoration-none">
                Overview
              </Link>
            ))}
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          {user.id ? (
            <div className="dropdown text-end">
              <Link
                to="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Xin Chào, {user.fullname || "Lỗi gòi"}
              </Link>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <Link className="dropdown-item" to="/me">
                    Trang Cá Nhân
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/me/change-password">
                    Đổi Mật Khẩu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/me/myCourses">
                    Khóa Học Của Tôi
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Đăng Xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="nav justify-content-center gap-2">
              <Link
                to="/login"
                className="nav-link px-2 link-dark text-decoration-none btn-primary btn"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="nav-link px-2 link-dark text-decoration-none btn-warning btn"
              >
                Đăng kí
              </Link>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
