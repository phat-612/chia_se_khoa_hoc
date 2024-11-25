import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CourseCard from "../components/CourseCard/courseCard";
import Pagination from "../components/Pagination/Pagination";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const fetchCourses = async (page, search = "") => {
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/courses?limit=${itemsPerPage}&offset=${offset}&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data.courses);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
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
            <div className="col-md-3 mb-3" key={course.id}>
              <CourseCard course={course} />
            </div>
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

export default CourseList;
