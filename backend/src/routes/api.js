import express from "express";

import { upload } from "../middlewares/uploadImage";
import ApiController from "../controllers/ApiController";
import auth from "../middlewares/auth";

const apiRouter = express.Router();

// USER
apiRouter.post("/register", ApiController.register);
apiRouter.post("/login", ApiController.login);
apiRouter.get("/logout", ApiController.logout);
apiRouter.post(
  "/update-info-user",
  auth.authToken,
  upload.single("avatar"),
  ApiController.updateInfoUser
);
apiRouter.post(
  "/update-password",
  auth.authToken,
  ApiController.updatePassword
);
// bên dưới là admin
apiRouter.post("/update-role", auth.isAdmin, ApiController.updateRole);
apiRouter.get("/get-all-users", auth.authToken, ApiController.getAllUsers);
apiRouter.get("/get-info-user", auth.authToken, ApiController.getUserById);
// REVIEW
apiRouter.post("/updateStatus", auth.isAdmin, ApiController.updateStatusReview);

// CATEGORY
apiRouter.post("/addCategory", auth.isAdmin, ApiController.addCategory);
apiRouter.post("/updateCategory", auth.isAdmin, ApiController.updateCategory);
apiRouter.post(
  "/removeCategory/:idCategory",
  auth.isAdmin,
  ApiController.removeCategory
);
// course
apiRouter.post("/getMyCourses", auth.authToken, ApiController.getMyCourses);
apiRouter.post("/addCourses", auth.isAdmin, ApiController.addCourse);
apiRouter.post("/update/:idCourse", auth.isAdmin, ApiController.updateCourse);
apiRouter.get(
  "/removeCourse/:idCourse",
  auth.isAdmin,
  ApiController.removeCourse
);
apiRouter.get("/courses", ApiController.getAllCoures);
apiRouter.get("/detailCourse/:idCourses", ApiController.getDetailCoure);

// ĐĂNG KÝ VÀ HỦY KHÓA HỌC
apiRouter.post("/checkRegisterCourses", ApiController.checkRegisterCourses);
apiRouter.post(
  "/registerCourses",
  auth.authToken,

  ApiController.registerCourses
);
apiRouter.post(
  "/cancelCourse/:enrollment_id",
  auth.authToken,
  ApiController.cancelCourse
);
apiRouter.post(
  "/cancelCourseByUserIdCoursesId",
  auth.authToken,
  ApiController.cancelCourseByUserIdCoursesId
);

export default apiRouter;
