import pool from "../configs/db"; // Giả sử bạn đã cấu hình pool đúng

const getCourses = async (limit, offset) => {
  const sql = `
    SELECT courses.id, courses.title, courses.description, courses.thumbnail_url, courses.course_url, courses.created_at, categories.name AS category_name
    FROM courses
    INNER JOIN categories ON courses.category_id = categories.id
    LIMIT ? OFFSET ?;
  `;
  try {
    const [rows] = await pool.execute(sql, [limit, offset]); // Truyền limit và offset vào câu truy vấn
    return rows; // Trả về kết quả truy vấn
  } catch (error) {
    return { error: error.message }; // Trả về thông báo lỗi nếu xảy ra
  }
};

const getTotalCourses = async (category_id) => {
  let sql;
  let params = [];
  if (category_id) {
    // Nếu có category_id, chỉ lấy số lượng khóa học theo danh mục
    sql = "SELECT COUNT(*) AS total FROM courses WHERE category_id = ?";
    params = [category_id];
  } else {
    // Nếu không có category_id, lấy tổng số khóa học
    sql = "SELECT COUNT(*) AS total FROM courses";
  }
  try {
    const [rows] = await pool.execute(sql, params);
    return rows[0].total; // Trả về tổng số khóa học
  } catch (error) {
    return { error: error.message };
  }
};

const getCoursesByCategory = async (category_id, limit, offset) => {
  const sql = `
    SELECT courses.*, categories.name AS category_name
    FROM courses
    LEFT JOIN categories ON courses.category_id = categories.id
    WHERE courses.category_id = ?
    LIMIT ? OFFSET ?;
  `;
  try {
    const [rows] = await pool.execute(sql, [category_id, limit, offset]);
    return rows; // Trả về kết quả truy vấn
  } catch (error) {
    return { error: error.message }; // Trả về thông báo lỗi nếu có
  }
};

const getDetailCourse = async (id) => {
  const [row] = await pool.execute(
    "SELECT courses.id,courses.title,courses.description,courses.thumbnail_url,courses.course_url,courses.created_at,categories.name AS category_name FROM courses INNER JOIN categories ON courses.category_id = categories.id WHERE courses.id=?",
    [id]
  );
  return row[0];
};
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
const removeCourse = async (id) => {
  // Câu lệnh SQL để xóa khóa học theo id
  const sql = "DELETE FROM `courses` WHERE id =?";
  try {
    const [rows] = await pool.query(sql, id);
    return rows; // Trả về kết quả từ truy vấn
  } catch {
    console.error("Error removing course:", error);
    throw error;
  }
};
const updateCourse = async (id, data) => {
  const updatedAt = new Date(); // Thời gian cập nhật
  const sql =
    "UPDATE courses SET title = ?, description = ?, category_id = ?, thumbnail_url = ?, course_url = ?, updated_at = ? WHERE id = ?";
  try {
    const [rows] = await pool.query(sql, [
      data.title,
      data.description,
      data.category_id,
      data.thumbnail_url,
      data.course_url,
      updatedAt,
      id, // Thêm id để điều kiện WHERE hoạt động
    ]);

    return rows; // Trả về kết quả từ truy vấn
  } catch (error) {
    console.error("Error updating course:", error);
    throw error; // Đảm bảo ném lỗi nếu có lỗi xảy ra
  }
};
const getCategories = async () => {
  const sql = "SELECT * FROM categories";
  try {
    const [rows] = await pool.execute(sql);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};
export default {
  getCourses,
  addCourse,
  removeCourse,
  updateCourse,
  getDetailCourse,
  getCategories,
  getCoursesByCategory,
  getTotalCourses,
};
