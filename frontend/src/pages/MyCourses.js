import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      setError("Người dùng không hợp lệ.");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/getMyCourses`,
          { userId: user.id }
        );
        setCourses(response.data);
      } catch (err) {
        setError("Không thể tải khóa học của bạn.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return <p>Đang tải danh sách khóa học...</p>;
  }

  if (error) {
    return <p className="text-danger">Lỗi: {error}</p>;
  }

  const handleSubmit = async (enrollment_id) => {
    try {
      // Gửi yêu cầu hủy khóa học
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cancelCourse/${enrollment_id}`
      );
      // Cập nhật lại danh sách khóa học sau khi hủy thành công
      setCourses(
        courses.filter((course) => course.enrollment_id !== enrollment_id)
      );
      console.log("Hủy khóa học thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi hủy khóa học:", error);
      alert("Đã xảy ra lỗi khi hủy khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h3>Khóa Học Của Tôi</h3>
      <div className="course-list d-flex flex-wrap gap-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.enrollment_id}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={course.course_image || "/path/to/placeholder.jpg"}
                className="card-img-top"
                alt={course.course_name || "Khóa học"}
              />
              <div className="card-body">
                <Link
                  className="h5 card-card-title"
                  to={`/courses/${course.course_id}`}
                >
                  {course.course_name}
                </Link>
                <p className="card-text An4Dong">{course.course_description}</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleSubmit(course.enrollment_id);
                  }}
                >
                  Hủy Đăng Ký
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Bạn chưa đăng ký khóa học nào.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
