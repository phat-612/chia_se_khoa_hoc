import AdminModel from "../services/AdminModel";
import CategoryModel from "../services/CategoryModel";
import CourseModel from "../services/CourseModel";
import UserModel from "../services/UserModel";

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
  const courses = await CourseModel.getCourses();
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
  const categories = await CourseModel.getCategories();
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
  const course = await CourseModel.getDetailCourse(req.params.id);
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
  const course = await CourseModel.getDetailCourse(req.params.id);
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
  getCategoryPage,
  getCoursePage,
  getDetailCourse,
  getEditCourse,
  getAddCourse,
  getUserPage,
};
