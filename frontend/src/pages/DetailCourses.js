import { useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Courses from "../components/CourseCard/detailCourse";
import Cookie from "js-cookie";

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
          return setIsRegistered(false);
        }
        // Gọi API kiểm tra đăng ký
        const checkResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/checkRegisterCourses`,
          { userId: user.id, coursesId: idCourses }
        );
        setIsRegistered(checkResponse.data.isRegistered);
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu.");
        console.error(err);
      } finally {
        setLoading(false); // Dừng trạng thái loading
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
    <div>
      <h2 className="text-center">Chi tiết khóa học</h2>
      {courseDetail && <Courses course={courseDetail} />}

      {isRegistered ? (
        <button
          type="button"
          className="btn btn-danger m-4"
          onClick={cancelRegistration}
        >
          Hủy Đăng Ký
        </button>
      ) : (
        <button className="btn btn-primary m-4" onClick={registerCourses}>
          Đăng ký
        </button>
      )}

      <hr />
    </div>
  );
};

export default DetailCourses;
