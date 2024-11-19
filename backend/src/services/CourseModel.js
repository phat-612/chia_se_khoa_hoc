import pool from "../configs/db"; // Giả sử bạn đã cấu hình pool đúng

const addCourse = async (data) => {
  // Lấy thời gian hiện tại cho created_at và updated_at
  const createdAt = new Date();
  const updatedAt = new Date();

  // Câu lệnh SQL để thêm khóa học mới
  const sql =
    "INSERT INTO courses (title, description, category_id, thumbnail_url, course_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";

  // Truyền giá trị vào câu lệnh SQL và thực thi truy vấn
  try {
    const [rows] = await pool.query(sql, [
      data.title,
      data.description,
      data.category_id,
      data.thumbnail_url,
      data.course_url,
      createdAt,
      updatedAt,
    ]);

    return rows; // Trả về kết quả từ truy vấn
  } catch (error) {
    console.error("Error adding course:", error);
    throw error; // Đảm bảo ném lỗi nếu có lỗi xảy ra
  }
};

export default { addCourse };
