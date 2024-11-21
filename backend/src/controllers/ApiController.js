import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../services/UserModel";
import CategoryModel from "../services/CategoryModel";
import CourseModel from "../services/CourseModel";
import AdminModel from "../services/AdminModel";
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
  req.session.user = {
    ...user,
    password: undefined,
  };
  req.session.isLogin = true;

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user.id,
      role: user.role,
    },
    accessToken: token,
  });
};
const logout = (req, res) => {
  req.session.destroy();
  res.json({
    message: "User logged out successfully",
  });
};
const updateInfoUser = async (req, res) => {
  const { email, fullname, oldAvatar } = req.body;
  //   lấy từ middleware xác thực token
  const { id } = req.user;
  let pathImg = oldAvatar;
  if (req.file) {
    pathImg = req.file.path;
  }
  const user = await UserModel.updateInfoUser(pathImg, email, fullname, id);
  if (user.error) {
    console.log(user.error);
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
const updateRole = async (req, res) => {
  const { id, role } = req.body;
  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ error: "Role is invalid" });
  }
  const user = await UserModel.updateRole(role, id);
  if (user.error) {
    return res.status(400).json({ error: "Update role failed" });
  }
  res.json({
    message: "Update role successfully",
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
  res.json({
    user,
    message: "Get user by id successfully",
  });
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
const getMyCourses = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId." });
    }
    const courses = await CourseModel.getCoursesByUserId(userId);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

const checkRegisterCourses = async (req, res) => {
  const { userId, coursesId } = req.body;
  const result = await CourseModel.checkRegisterCourses(userId, coursesId);
  if (result) {
    return res.json({ isRegistered: true });
  } else {
    return res.json({ isRegistered: false });
  }
};

const registerCourses = async (req, res) => {
  const { userId, coursesId } = req.body;
  const row = await CourseModel.registerCourses(userId, coursesId);
  res.json({ message: "Dang ky khoa hoc thanh cong" });
};

const cancelCourse = async (req, res) => {
  const { enrollment_id } = req.params;
  await CourseModel.cancelCourse(enrollment_id);
  res.json({ message: "huy dang ky khoa hoc thanh cong" });
};

const cancelCourseByUserIdCoursesId = async (req, res) => {
  const { userId, coursesId } = req.body;
  await CourseModel.cancelCourseByUserIdCoursesId(userId, coursesId);
  res.json({ message: "huy dang ky khoa hoc thanh cong" });
};

const addCourse = async (req, res) => {
  await CourseModel.addCourse(req.body);
  return res.redirect("/admin/course");
};
const removeCourse = async (req, res) => {
  const { idCourse } = req.params;
  await CourseModel.removeCourse(idCourse);
  return res.redirect("/admin/course");
};
const updateCourse = async (req, res) => {
  const { idCourse } = req.params;
  await CourseModel.updateCourse(idCourse, req.body);
  return res.redirect("/admin/course");
};
// lấy tất cả sản phẩm hiện ra giao diện
const getAllCoures = async (req, res) => {
  // Lấy limit và offset từ query params
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0;

  const search = req.query.search || "";

  try {
    const { courses, total } = await CourseModel.getAllCoursesUser(
      limit,
      offset,
      search
    );

    // Trả kết quả về cho frontend
    return res.json({ courses, total });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi khi lấy dữ liệu" });
  }
};

export default {
  register,
  login,
  logout,
  updateInfoUser,
  updatePassword,
  updateRole,
  getAllUsers,
  getUserById,

  // CATEGORY
  getAllCategory,
  addCategory,
  updateCategory,
  removeCategory,
  // course
  getMyCourses,
  addCourse,
  removeCourse,
  updateCourse,
  getAllCoures,

  cancelCourse,
  registerCourses,
  checkRegisterCourses,
  cancelCourseByUserIdCoursesId,
};
