import pool from "../configs/db";

const getAllReviews = async (find, rating, status, limit, offset) => {
  const sql =
    "SELECT reviews.*, users.fullname, courses.title FROM reviews JOIN users ON users.id = reviews.user_id INNER JOIN courses ON courses.id = reviews.course_id WHERE (users.fullname LIKE ? OR courses.title LIKE ?) AND (reviews.rating = ? OR ? = 'all') AND (reviews.status = ? OR ? = 'all') ORDER BY reviews.created_at DESC limit ? offset ? ";
  const values = [
    `%${find}%`,
    `%${find}%`,
    rating,
    rating,
    status,
    status,
    limit,
    offset,
  ];

  try {
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};
const countAllReview = async (find, rating, status) => {
  const sql =
    "SELECT COUNT(*) AS quantityReview FROM reviews JOIN users ON users.id = reviews.user_id JOIN courses ON courses.id = reviews.course_id WHERE (users.fullname LIKE ? OR courses.title LIKE ?) AND (reviews.rating = ? OR ? = 'all') AND (reviews.status = ? OR ? = 'all')";
  const values = [`%${find}%`, `%${find}%`, rating, rating, status, status];
  try {
    const [rows] = await pool.query(sql, values);
    return rows[0].quantityReview;
  } catch (error) {
    return { error: error.message };
  }
};

const getReviewByIdCourse = async (course_id) => {
  const sql =
    "SELECT reviews.*, users.avatar, users.fullname FROM reviews JOIN users ON users.id = reviews.user_id WHERE course_id = ?";
  const values = [course_id];
  try {
    const [rows] = await pool.execute(sql, values);
    if (rows.length == 0) {
      return null;
    }
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};

const addReview = async (user_id, course_id, rating, comment) => {
  const sql =
    "INSERT INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)";
  const values = [user_id, course_id, rating, comment];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};

const editReview = async (rating, comment, id) => {
  const sql =
    "UPDATE reviews SET rating = ?, comment = ?, status=0  WHERE id = ?";
  const values = [rating, comment, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};

const updateStatusReview = async (status, id) => {
  const sql = "UPDATE reviews SET status = ? WHERE id = ?";
  const values = [status, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};
export default {
  getAllReviews,
  countAllReview,
  getReviewByIdCourse,
  addReview,
  editReview,
  updateStatusReview,
};
