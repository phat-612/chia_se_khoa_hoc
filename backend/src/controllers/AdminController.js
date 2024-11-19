import AdminModel from "../services/AdminModel";
import CategoryModel from "../services/CategoryModel";
import UserModel from "../services/UserModel";

const getCoursesPage = async (req, res) => {
  res.render("hello");
};

// CATEGORY
const getCategoryPage = async (req, res) => {
  const categories = await CategoryModel.getAllCategory();
  res.render("main", {
    data: {
      title: "Courses",
      header: "partials/header",
      page: "category/allCategory",
      categories,
    },
  });
};

// COURSES
const getCoursePage = async (req, res) => {
  const courses = await AdminModel.getCourses();
  res.render("main", {
    data: {
      title: "Course",
      header: "partials/header",
      page: "courses/course",
      courses: courses,
    },
  });
};
const getAddCourse = async (req, res) => {
  const categories = await AdminModel.getCategories();
  res.render("main", {
    data: {
      title: "Add Course",
      header: "partials/header",
      page: "courses/addCourse",
      categories,
    },
  });
};
const getDetailCourse = async (req, res) => {
  const course = await AdminModel.getDetailCourse(req.params.id);
  res.render("main", {
    data: {
      title: "detailCourse",
      header: "partials/header",
      page: "courses/detailCourse",
      course: course,
    },
  });
};
const getEditCourse = async (req, res) => {
  const course = await AdminModel.getDetailCourse(req.params.id);
  res.render("main", {
    data: {
      title: "detailCourse",
      header: "partials/header",
      page: "courses/editCourse",
      course: course,
    },
  });
};

// USER
const getUserPage = async (req, res) => {
  const users = await UserModel.getAllUsers();
  res.render("main", {
    data: {
      title: "User",
      page: "users/listUser",
      users,
    },
  });
};
export default {
  getCoursesPage,
  getCategoryPage,
  getCoursePage,
  getDetailCourse,
  getEditCourse,
  getAddCourse,
  getUserPage,
};
