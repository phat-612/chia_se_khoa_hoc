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
apiRouter.post("/update-role", ApiController.updateRole);
apiRouter.get("/get-all-users", auth.authToken, ApiController.getAllUsers);
apiRouter.get("/get-info-user", auth.authToken, ApiController.getUserById);

// CATEGORY
apiRouter.post("/addCategory", ApiController.addCategory);
apiRouter.post("/updateCategory", ApiController.updateCategory);
apiRouter.post("/removeCategory/:idCategory", ApiController.removeCategory);
// course
apiRouter.post("/getMyCourses", ApiController.getMyCourses);
apiRouter.post("/addCourses", ApiController.addCourse);
apiRouter.post("/update/:idCourse", ApiController.updateCourse);
apiRouter.get("/removeCourse/:idCourse", ApiController.removeCourse);
apiRouter.get("/courses", ApiController.getAllCoures);

// ĐĂNG KÝ VÀ HỦY KHÓA HỌC
apiRouter.post("/checkRegisterCourses", ApiController.checkRegisterCourses);
apiRouter.post("/registerCourses", ApiController.registerCourses);
apiRouter.post("/cancelCourse/:enrollment_id", ApiController.cancelCourse);
apiRouter.post(
  "/cancelCourseByUserIdCoursesId",
  ApiController.cancelCourseByUserIdCoursesId
);

export default apiRouter;
