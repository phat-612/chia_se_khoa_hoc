import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  // Hàm xử lý khi người dùng nhấn "Enter"
  const handleSubmit = (e) => {
    e.preventDefault(); // Chặn hành vi mặc định của form
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-4">
        <div className="col-11">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị ô tìm kiếm
          />
        </div>
        <div className="col-1">
          <button type="submit" className="btn btn-primary w-100">
            Tìm...
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
