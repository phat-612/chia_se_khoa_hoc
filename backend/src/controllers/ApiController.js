import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../services/UserModel";
import CategoryModel from "../services/CategoryModel";

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

// CATEGORY
const getAllCategory = async (req, res) => {
  const categories = await CategoryModel.getAllCategory();
  return categories;
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.addCategory(name);
  if (category.error) {
    return res.status(400).json({ error: "Add category failed" });
  }
  return res.redirect("back");
};

const updateCategory = async (req, res) => {
  const { id, name } = req.body;
  const category = await CategoryModel.updateCategory(id, name);
  if (category.error) {
    return res.status(400).json({ error: "Update category failed" });
  }
  return res.redirect("back");
};

// const removeCategory = async (req, res) => {
//   const { idCategory } = req.params;
//   try {
//     await CategoryModel.removeCategory(idCategory);
//     res.redirect("back");
//   } catch (error) {
//     if (error.code === "ER_ROW_IS_REFERENCED_2") {
//       res.locals.error = "Có Khóa Học Trong Danh Mục Này";
//       console.log("Có Khóa Học Trong Danh Mục Này");
//       return res.redirect("back");
//     }
//     console.error(error.message);
//     res.status(500).send("Lỗi máy chủ");
//   }
// };

const removeCategory = async (req, res) => {
  const { idCategory } = req.params;
  try {
    await CategoryModel.removeCategory(idCategory);
    res.send(
      "<script>alert('Danh mục đã được xóa thành công!'); window.history.back();</script>"
    );
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.send(
        "<script>alert('Không thể xóa danh mục vì còn khóa học liên quan.'); window.history.back();</script>"
      );
    }
    console.error(error.message);
    res.status(500).send("Lỗi máy chủ");
  }
};
// course

const addCourse = async (req, res) => {
  const { newCourse } = req.body;
  const course = await CategoryModel.addCourse(newCourse);
};
export default {
  register,
  login,
  updateInfoUser,
  updatePassword,
  getAllUsers,
  getUserById,

  // CATEGORY
  getAllCategory,
  addCategory,
  updateCategory,
  removeCategory,
  // course
  addCourse,
};
