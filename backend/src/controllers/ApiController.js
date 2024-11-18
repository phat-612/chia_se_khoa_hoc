import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../services/UserModel";

const register = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  const hashPassword = hashSync(password, 10);
  const user = await UserModel.addUser(username, hashPassword, email, fullname);
  if (user.error) {
    return res.status(400).json(user);
  }
  res.json({
    message: "User registered successfully",
    user,
  });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.getUserByUserName(username);
  if (user.error) {
    return res.status(400).json({ error: "Invalid info login" });
  }
  if (!compareSync(password, user.password)) {
    return res.status(400).json({ error: "Invalid info login" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user.id,
      role: user.role,
    },
    accessToken: token,
  });
};
const updateInfoUser = async (req, res) => {
  const { email, fullname } = req.body;
  //   lấy từ middleware xác thực token
  const { id } = req.user;
  const user = await UserModel.updateInfoUser(email, fullname, id);
  if (user.error) {
    return res.status(400).json({ error: "Update user failed" });
  }
  res.json({
    message: "User updated successfully",
    user,
  });
};
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, rePassword } = req.body;
  const { id } = req.user;
  if (newPassword !== rePassword) {
    return res.status(400).json({ error: "Password not match" });
  }
  const user = await UserModel.getUserById(id);
  const checkOldPassword = compareSync(oldPassword, user.password);
  if (!checkOldPassword) {
    return res.status(400).json({ error: "Old password is incorrect" });
  }
  const hashPassword = hashSync(newPassword, 10);
  const result = await UserModel.updatePassword(hashPassword, id);
  if (result.error) {
    return res.status(400).json({ error: "Update password failed" });
  }
  res.json({
    message: "Password updated successfully",
  });
};
const getAllUsers = async (req, res) => {
  const users = await UserModel.getAllUsers();
  if (users.error) {
    return res.status(400).json({ error: "Get all users failed" });
  }
  res.json(users);
};
const getUserById = async (req, res) => {
  // id user lấy từ middleware xác thực token
  const { id } = req.user;
  const user = await UserModel.getUserById(id);
  if (user.error) {
    return res.status(400).json({ error: "Get user by id failed" });
  }
  res.json(user);
};

export default {
  register,
  login,
  updateInfoUser,
  updatePassword,
  getAllUsers,
  getUserById,
};
