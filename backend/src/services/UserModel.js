import pool from "../configs/db";

const addUser = async (username, password, email, fullname) => {
  const sql =
    "INSERT INTO users (username, password, email, fullname) VALUES (?, ?, ?, ?)";
  const values = [username, password, email, fullname];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      if (error.sqlMessage.includes("username")) {
        return { error: "Username already exists" };
      }
      if (error.sqlMessage.includes("email")) {
        return { error: "Email already exists" };
      }
    }
    return { error: error.message };
  }
};
const updateInfoUser = async (email, fullname, id) => {
  const sql = "UPDATE users SET email = ?, fullname = ? WHERE id = ?";
  const values = [email, fullname, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};
const updatePassword = async (password, id) => {
  const sql = "UPDATE users SET password = ? WHERE id = ?";
  const values = [password, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};
const getUserById = async (id) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const values = [id];
  try {
    const [row] = await pool.execute(sql, values);
    if (row.length === 0) {
      return null;
    }
    return row[0];
  } catch (error) {
    return { error: error.message };
  }
};
const getUserByUserName = async (username) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const values = [username];
  try {
    const [row] = await pool.execute(sql, values);
    if (row.length === 0) {
      return null;
    }
    return row[0];
  } catch (error) {
    return { error: error.message };
  }
};
const getAllUsers = async () => {
  const sql = "SELECT * FROM users";
  try {
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  addUser,
  updateInfoUser,
  updatePassword,
  getUserById,
  getUserByUserName,
  getAllUsers,
};
