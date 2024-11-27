import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          {currentPage > 1 ? (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
          ) : (
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
          )}

          {/* Các trang */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {currentPage < totalPages ? (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          ) : (
            <li className="page-item disabled">
              <span className="page-link">Next</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
