import express from "express";

import ApiController from "../controllers/ApiController";

import auth from "../middlewares/auth";

const apiRouter = express.Router();

apiRouter.post("/register", ApiController.register);
apiRouter.post("/login", ApiController.login);
apiRouter.get("/logout", ApiController.logout);
apiRouter.post(
  "/update-info-user",
  auth.authToken,
  ApiController.updateInfoUser
);
apiRouter.post(
  "/update-password",
  auth.authToken,
  ApiController.updatePassword
);
apiRouter.get("/get-all-users", auth.authToken, ApiController.getAllUsers);
apiRouter.get("/get-info-user", auth.authToken, ApiController.getUserById);

// CATEGORY
apiRouter.post("/addCategory", ApiController.addCategory);
apiRouter.post("/updateCategory", ApiController.updateCategory);
apiRouter.post("/removeCategory/:idCategory", ApiController.removeCategory);
// course
apiRouter.post("/addCourse", ApiController.addCourse);
export default apiRouter;
