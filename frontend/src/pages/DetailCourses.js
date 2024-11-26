import { useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Courses from "../components/CourseCard/detailCourse";
import ReviewCourse from "../components/CourseCard/ReviewCourse";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

const DetailCourses = () => {
  const { idCourses } = useParams(); // Lấy idCourses từ URL
  const { user } = useContext(AuthContext); // Lấy thông tin user từ context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);
  // Kiểm tra trạng thái đăng ký và tải danh sách khóa học
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/detailCourse/${idCourses}`
        );
        setCourseDetail(response.data);

        if (!user || !user.id) {
          setIsRegistered(false);
          setLoading(false); // Dừng trạng thái loading
          return;
        }
        // Gọi API kiểm tra đăng ký
        const checkResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/checkRegisterCourses`,
          { userId: user.id, coursesId: idCourses }
        );
        setIsRegistered(checkResponse.data.isRegistered);
        setLoading(false); // Dừng trạng thái loading
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu.");
        console.error(err);
      }
    };
    fetchData();
  }, [idCourses, user, navigate]);

  // Hàm đăng ký khóa học
  const registerCourses = async () => {
    try {
      if (!user || !user.id) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/registerCourses`,
        { userId: user.id, coursesId: idCourses },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("accessToken")}`,
          },
        }
      );
      setIsRegistered(true); // Đánh dấu trạng thái đã đăng ký
    } catch (err) {
      setError("Đăng ký không thành công! Vui lòng thử lại.");
    }
  };

  // Hàm hủy đăng ký khóa học
  const cancelRegistration = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cancelCourseByUserIdCoursesId`,
        { userId: user.id, coursesId: idCourses },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("accessToken")}`,
          },
        }
      );
      setIsRegistered(false); // Đánh dấu trạng thái chưa đăng ký
    } catch (err) {
      setError("Hủy đăng ký không thành công! Vui lòng thử lại.");
    }
  };

  // Xử lý trạng thái loading hoặc lỗi
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center mb-3">Chi tiết khóa học</h1>
      <div className="row">
        <div className="col-6">
          <img src={courseDetail.thumbnail_url} alt="" width={"100%"} />
        </div>
        <div className="col-6">
          <h4 className="h4 mb-3">Tên Khóa Học:</h4>
          <p className="lead"> {courseDetail.title}</p>
          <h4 className="h4 mb-3">Mô Tả Khóa Học:</h4>
          <p className="lead"> {courseDetail.description}</p>
          <h4 className="h4 mb-3">Danh Mục:</h4>
          <p className="lead"> {courseDetail.category_name}</p>
          <h4 className="h4 mb-3">Ngày Tạo:</h4>
          <p className="lead">
            {new Date(courseDetail.created_at).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="col-12 d-flex justify-content-end">
          {isRegistered ? (
            <button
              type="button"
              className="btn btn-danger me-4"
              onClick={cancelRegistration}
            >
              Hủy Đăng Ký
            </button>
          ) : (
            <button className="btn btn-primary me-4" onClick={registerCourses}>
              Đăng ký
            </button>
          )}

          <Link
            to={courseDetail.course_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Đến Tài Liệu
          </Link>
        </div>

        {/* đây là chỗ đánh giá viết trong cái div phía dưới */}
        <div className="col-12">
          <ReviewCourse />
        </div>
      </div>
    </div>
  );
};

export default DetailCourses;
