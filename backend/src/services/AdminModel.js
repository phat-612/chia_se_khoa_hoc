// import pool from "../configs/db";
// // lấy danh sách khóa học
// const getCourses = async () => {
//   const sql =
//     "SELECT courses.id AS course_id,ourses.title AS course_title,courses.description,courses.thumbnail_url,courses.course_url,courses.created_at,categories.name AS category_nameFROM coursesINNER JOIN categories ON courses.category_id = categories.id";
//   try {
//     const [rows] = await pool.execute(sql); // Truyền sql vào phương thức execute
//     return rows; // Trả về kết quả truy vấn
//   } catch (error) {
//     return { error: error.message }; // Trả về thông báo lỗi nếu xảy ra
//   }
// };
// const getDetailCourse = async (id) => {
//   const [row] = await pool.execute("SELECT * FROM `courses` where id=?", [id]);
//   return row[0];
// };

// // lấy danh sách danh mục

// export default { getCourses, getDetailCourse, getCategories };
