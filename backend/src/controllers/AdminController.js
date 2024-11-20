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
  const { category_id, page = 1 } = req.query; // Lấy category_id và page từ query string (mặc định là trang 1)
  const limit = 5; // Số khóa học mỗi trang
  const offset = (page - 1) * limit;
  // Lấy danh sách danh mục
  const categories = await CourseModel.getCategories();
  // Lấy danh sách khóa học theo category_id và phân trang
  let courses;
  if (category_id) {
    courses = await CourseModel.getCoursesByCategory(
      category_id,
      limit,
      offset
    );
  } else {
    courses = await CourseModel.getCourses(limit, offset); // Lấy tất cả khóa học nếu không có lọc
  }

  // Lấy tổng số khóa học để tính số trang
  const totalCourses = await CourseModel.getTotalCourses(category_id);
  const totalPages = Math.ceil(totalCourses / limit); // Tính tổng số trang

  res.render("main", {
    data: {
      title: "Danh Sách Khóa Học",
      header: "partials/header",
      page: "courses/course",
      courses,
      categories,
      selectedCategory: category_id,
      currentPage: parseInt(page),
      totalPages,
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
  const categories = await CourseModel.getCategories();
  res.render("main", {
    data: {
      title: "detailCourse",
      header: "partials/header",
      page: "courses/editCourse",
      course: course,
      categories,
    },
  });
};

// USER
const getUserPage = async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  const users = await UserModel.getUsersWithPagination(search, limit, offset);
  const totalUsers = await UserModel.countUsers(search);
  const totalPages = Math.ceil(totalUsers / limit);

  res.render("main", {
    data: {
      title: "User",
      page: "users/listUser",
      users,
      currentPage: parseInt(page),
      totalPages,
      search,
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
