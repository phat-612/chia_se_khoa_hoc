import express from "express";

import ApiController from "../controllers/ApiController";

import auth from "../middlewares/auth";

const apiRouter = express.Router();

apiRouter.post("/register", ApiController.register);
apiRouter.post("/login", ApiController.login);
apiRouter.post("/update-info-user", ApiController.updateInfoUser);
apiRouter.post("/update-password", ApiController.updatePassword);
apiRouter.get("/get-all-users", auth.authToken, ApiController.getAllUsers);
apiRouter.get("/get-info-user", auth.authToken, ApiController.getUserById);

export default apiRouter;
