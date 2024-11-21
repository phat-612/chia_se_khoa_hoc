import pool from "../configs/db";

const getAllCategory = async (limit, offset) => {
  limit = limit || 7;
  offset = offset || 0;
  const sql = "SELECT * FROM `categories` LIMIT ? OFFSET ? ";
  const [row] = await pool.execute(sql, [limit, offset]);
  return row;
};

const getAllCategoryBySearch = async (limit, offset, search) => {
  limit = limit || 7;
  offset = offset || 0;
  const sql = "SELECT * FROM `categories` WHERE name = ? LIMIT ? OFFSET ? ";
  const [row] = await pool.execute(sql, [search, limit, offset]);
  return row;
};

const addCategory = async (name) => {
  const sql = "INSERT INTO `categories` (name) VALUES (?)";
  const values = [name];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { error: "Ten Danh Muc Da Ton Tai" };
    }
  }
};

const updateCategory = async (id, name) => {
  const sql = "UPDATE `categories` SET `name` = ? WHERE `id` = ?";
  const values = [name, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { error: "Ten Danh Muc Da Ton Tai" };
    }
  }
};

const removeCategory = async (id) => {
  const sql = "DELETE FROM `categories` WHERE `id`=? ";
  const values = [id];
  const [row] = await pool.execute(sql, values);
  return row;
};

const getAllIdCategoryInCourses = async () => {
  const sql = "SELECT DISTINCT category_id FROM courses";
  const [row] = await pool.execute(sql);
  return row;
};

const getTotal = async () => {
  const sql = "SELECT COUNT(*) AS total FROM categories";
  const total = await pool.execute(sql);
  return total[0];
};

export default {
  getAllCategory,
  addCategory,
  updateCategory,
  removeCategory,
  getAllIdCategoryInCourses,
  getTotal,
};
