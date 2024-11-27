import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CourseCard from "../components/CourseCard/courseCard";
import Pagination from "../components/Pagination/Pagination";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const fetchCourses = async (page = 1, search = "") => {
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/courses?limit=${itemsPerPage}&offset=${offset}&search=${search}`
      );
      if (!response) {
        throw new Error("Failed to fetch courses");
      }
      setCourses(response.data.courses);

      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, searchQuery);
    // console.log(searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset trang khi thay đổi từ khóa tìm kiếm
  };
  // trang muốn tới
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Các khóa học chia sẻ</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>Không có khóa học nào để hiển thị.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Course;
