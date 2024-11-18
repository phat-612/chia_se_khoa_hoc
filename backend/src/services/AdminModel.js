import pool from "../configs/db";
// lấy danh sách khóa học

const getCourses = async () => {
  const sql = "SELECT * FROM courses";
  try {
    const [rows] = await pool.execute(sql); // Truyền sql vào phương thức execute
    return rows; // Trả về kết quả truy vấn
  } catch (error) {
    return { error: error.message }; // Trả về thông báo lỗi nếu xảy ra
  }
};
const getDetailCourse = async (id) => {
  const [row] = await pool.execute("SELECT * FROM `courses` where id=?", [id]);
  return row[0];
};
export default { getCourses, getDetailCourse };