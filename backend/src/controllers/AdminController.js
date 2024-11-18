const getCoursesPage = async (req, res) => {
  res.render("hello");
};

const getCategoryPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Courses",
      header: "partials/header",
      page: "category/allCategory",
    },
  });
};

export default { getCoursesPage, getCategoryPage };
