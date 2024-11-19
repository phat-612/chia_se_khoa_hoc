import pool from "../configs/db";

const getAllCategory = async () => {
  const sql = "SELECT * FROM `categories`";
  const [row] = await pool.execute(sql);
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

export default {
  getAllCategory,
  addCategory,
  updateCategory,
  removeCategory,
  getAllIdCategoryInCourses,
};
