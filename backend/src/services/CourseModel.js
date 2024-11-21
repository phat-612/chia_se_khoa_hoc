import pool from "../configs/db";

const getCourses = async (limit, offset) => {
  limit = limit || 5; // Giá trị mặc định là 5
  offset = offset || 0; // Giá trị mặc định là 0
  const sql = `
    SELECT courses.id, courses.title, courses.description, courses.thumbnail_url, courses.course_url, courses.created_at, categories.name AS category_name
    FROM courses
    INNER JOIN categories ON courses.category_id = categories.id
    LIMIT ? OFFSET ?;
  `;
  try {
    const [rows] = await pool.execute(sql, [limit, offset]);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};

const getCoursesByUserId = async (userId) => {
  const sql = `SELECT 
    e.id AS enrollment_id,
    e.user_id,
    e.course_id,
    e.enrolled_at,
    c.title AS course_name,
    c.description AS course_description,
    c.thumbnail_url AS course_image
FROM enrollments e
LEFT JOIN courses c ON e.course_id = c.id
WHERE e.user_id = ?
`;
  const rows = await pool.execute(sql, [userId]);
  return rows[0];
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

const checkRegisterCourses = async (user_id, courses_id) => {
  const sql = "SELECT * FROM `enrollments` WHERE user_id = ? AND course_id = ?";
  const values = [user_id, courses_id];
  const [rows] = await pool.execute(sql, values);
  return rows.length > 0 ? rows[0] : null;
};

const registerCourses = async (user_id, courses_id) => {
  const sql = "INSERT INTO `enrollments` (`user_id`, `course_id`) VALUES (?,?)";
  const values = [user_id, courses_id];
  const [row] = await pool.query(sql, values);
  return row;
};

const cancelCourse = async (id) => {
  const sql = "DELETE FROM enrollments where id = ?";
  await pool.query(sql, [id]);
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
const getAllCoursesUser = async (limit, offset, search = "") => {
  const searchQuery = `%${search}%`; // Tạo chuỗi tìm kiếm với dấu "%"

  const coursesSql = `
    SELECT 
      courses.id, 
      courses.title, 
      courses.description, 
      courses.thumbnail_url, 
      courses.course_url, 
      courses.created_at, 
      categories.name AS category_name
    FROM courses
    INNER JOIN categories ON courses.category_id = categories.id
    WHERE courses.title LIKE ? OR courses.description LIKE ?
    LIMIT ? OFFSET ?;
  `;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM courses
    WHERE title LIKE ? OR description LIKE ?;  
  `;

  // Truy vấn lấy khóa học theo tìm kiếm và phân trang
  const [coursesRows] = await pool.execute(coursesSql, [
    searchQuery,
    searchQuery,
    limit,
    offset,
  ]);
  // Nếu không có kết quả, trả về mảng rỗng và tổng số = 0
  if (coursesRows.length == 0) {
    return { courses: [], total: 0 };
  }

  // Truy vấn lấy tổng số khóa học theo tìm kiếm
  const [countRows] = await pool.execute(countSql, [searchQuery, searchQuery]);

  // Kiểm tra nếu countRows là mảng hợp lệ
  if (!Array.isArray(countRows)) {
    throw new Error("Dữ liệu trả về không phải là mảng");
  }

  const total = countRows[0].total;

  return {
    courses: coursesRows, // Danh sách khóa học
    total: total, // Tổng số khóa học
  };
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
  getCoursesByUserId,
  getAllCoursesUser,
  cancelCourse,
  registerCourses,
  checkRegisterCourses,
};
