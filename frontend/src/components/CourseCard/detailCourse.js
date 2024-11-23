import React from "react";

const CourseDetail = ({ course }) => {
  if (!course) return <div>Không có thông tin khóa học để hiển thị.</div>;

  return (
    <div className="card mb-4 mx-auto" style={{ maxWidth: "400px" }}>
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">Khóa học: {course.title}</h5>
        <p className="card-text">{course.description}</p>
        <p>
          <strong>Danh mục:</strong> {course.category_name}
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(course.created_at).toLocaleDateString("vi-VN")}
        </p>
        {course.thumbnail_url && (
          <a
            href={course.course_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2"
          >
            Xem video
          </a>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
