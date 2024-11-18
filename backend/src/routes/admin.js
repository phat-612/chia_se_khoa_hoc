import express from "express";

import AdminController from "../controllers/AdminController";

const adminRouter = express.Router();

adminRouter.get("/", AdminController.getCoursesPage);
adminRouter.get("/category", AdminController.getCategoryPage);

export default adminRouter;
