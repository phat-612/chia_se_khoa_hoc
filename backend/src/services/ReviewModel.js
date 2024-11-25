import pool from "../configs/db";

const getAllReviews = async () => {
  const sql = "SELECT * FROM review";
  try {
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};

const getReviewByIdCourse = async (course_id) => {
  const sql = "SELECT * FROM review WHERE course_id = ?";
  const values = [course_id];
  try {
    const [rows] = await pool.execute(sql, values);
    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    return { error: error.message };
  }
};

const addReview = async (user_id, course_id, rating, comment) => {
  const sql =
    "INSERT INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)";
  const values = [user_id, course_id, rating, comment];
  try {
  } catch (error) {}
};
export default { getAllReviews, getReviewByIdCourse, addReview };
