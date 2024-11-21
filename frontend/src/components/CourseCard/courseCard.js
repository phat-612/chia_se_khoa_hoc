// CourseCard.js
import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* Hình ảnh thumbnail */}
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="card-img-top"
      />

      {/* Nội dung khóa học */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{course.title}</h5>
        <p className="card-text text-muted small mb-3 text-truncate">
          {course.description}
        </p>

        {/* Button "Xem Khóa Học" */}
        <div className="mt-auto">
          <Link to={`/courses/${course.id}`} className="btn btn-primary w-100">
            Xem Khóa Học
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
