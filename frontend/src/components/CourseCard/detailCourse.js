import React from "react";

const CourseDetail = ({ course }) => {
  if (!course) return <div>Không có thông tin khóa học để hiển thị.</div>;

  return (
    <div className="card mb-4 w-25 m-4">
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="card-img-top "
      />
      <div className="card-body">
        <h5 className="card-title">Khóa học : {course.title}</h5>
        <p className="card-text">{course.description}</p>
        <p>
          <strong>Danh mục:</strong> {course.category_name}
        </p>
        <p>
          <strong>Ngày tạo:</strong>
          {new Date(course.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;
