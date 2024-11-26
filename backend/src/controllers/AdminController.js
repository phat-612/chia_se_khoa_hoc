import AdminModel from "../services/AdminModel";
import CategoryModel from "../services/CategoryModel";
import CourseModel from "../services/CourseModel";
import UserModel from "../services/UserModel";
import ReviewModel from "../services/ReviewModel";
import moment from "moment";

// CATEGORY
const getCategoryPage = async (req, res) => {
  try {
    const { search, page = 1 } = req.query;
    const limit = 7;
    const offset = (page - 1) * limit;
    let categories, total;

    if (search) {
      categories = await CategoryModel.getAllCategoryBySearch(
        limit,
        offset,
        search
      );
      total = await CategoryModel.getTotalBySearch(search);
    } else {
      categories = await CategoryModel.getAllCategory(limit, offset);
      total = await CategoryModel.getTotal();
    }

    const totalPages = Math.ceil(total[0].total / limit);

    res.render("main", {
      data: {
        title: "Courses",
        header: "partials/header",
        page: "category/allCategory",
        categories,
        currentPage: parseInt(page),
        totalPages,
        search,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Đã xảy ra lỗi khi xử lý danh mục.");
  }
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

  // Định dạng ngày tháng trong khóa học
  courses.forEach((course) => {
    const date = new Date(course.created_at);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày (dd)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (mm)
    const year = String(date.getFullYear()).slice();
    course.formattedDate = `${day}/${month}/${year}`;
  });

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
// REVIEWS
const getReviewPage = async (req, res) => {
  let { find, rating, status, page } = req.query;
  if (!rating) {
    rating = "all";
  }
  if (!status) {
    status = "all";
  }
  if (!find) {
    find = "";
  }
  if (!page) {
    page = 1;
  }
  const limit = 20;
  const offset = (page - 1) * limit;
  let reviews = await ReviewModel.getAllReviews(
    find,
    rating,
    status,
    limit,
    offset
  );
  const quantityReviews = await ReviewModel.countAllReview(
    find,
    rating,
    status
  );
  const totalPage = Math.ceil(quantityReviews / limit);
  console.log(reviews);
  reviews = reviews.map((review) => {
    return {
      ...review,
      created_at: moment(review.created_at)
        .utcOffset("+07:00")
        .format("DD/MM/YYYY"),
    };
  });
  console.log(parseInt(page));
  res.render("main", {
    data: {
      title: "Reviews",
      page: "reviews",
      reviews,
      currentPage: parseInt(page),
      totalPage,
      find,
      rating,
      status,
    },
  });
};

// login
const getLoginPage = async (req, res) => {
  res.render("login", {
    data: {
      title: "Login",
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
  getReviewPage,
  getLoginPage,
};
