// CourseList.js
import React from "react";
import CourseCard from "../components/CourseCard/courseCard";

const CourseList = () => {
  // Dữ liệu mẫu cho các khóa học
  const courses = [
    {
      id: 1,
      title: "Khóa Học React Cơ Bản",
      description: "Học cách xây dựng ứng dụng web với React.",
      thumbnail_url: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Khóa Học Node.js",
      description: "Học cách xây dựng server với Node.js.",
      thumbnail_url: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Khóa Học JavaScript Nâng Cao",
      description: "Nâng cao kỹ năng JavaScript với các kỹ thuật mới.",
      thumbnail_url: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      title: "Khóa Học Python Cơ Bản",
      description: "Học lập trình cơ bản với Python.",
      thumbnail_url: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Các khóa học chia sẽ</h2>
      <div className="row">
        {/* Lặp qua các khóa học và hiển thị mỗi khóa học bằng CourseCard */}
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <CourseCard course={course} />
            {/* Sử dụng CourseCard và truyền props */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
