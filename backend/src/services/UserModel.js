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
const updateInfoUser = async (avatar, email, fullname, id) => {
  const sql =
    "UPDATE users SET avatar = ?, email = ?, fullname = ? WHERE id = ?";
  const values = [avatar, email, fullname, id];
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
      return { error: "User not found" };
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
const getUsersWithPagination = async (searchTerm, limit, offset) => {
  const sql =
    "SELECT * FROM users WHERE fullname LIKE ? OR email LIKE ? LIMIT ? OFFSET ?";
  const values = [`%${searchTerm}%`, `%${searchTerm}%`, limit, offset];
  try {
    const [rows] = await pool.execute(sql, values);
    return rows;
  } catch (error) {
    return { error: error.message };
  }
};
const countUsers = async (searchTerm) => {
  const sql =
    "SELECT COUNT(*) as total FROM users WHERE fullname LIKE ? OR email LIKE ?";
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];
  try {
    const [rows] = await pool.execute(sql, values);
    return rows[0].total;
  } catch (error) {
    return { error: error.message };
  }
};
const updateRole = async (role, id) => {
  const sql = "UPDATE users SET role = ? WHERE id = ?";
  const values = [role, id];
  try {
    const [row] = await pool.execute(sql, values);
    return row;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  addUser,
  updateInfoUser,
  updatePassword,
  updateRole,
  getUserById,
  getUserByUserName,
  getUsersWithPagination,
  countUsers,
  getAllUsers,
};
