import express from "express";

import AdminController from "../controllers/AdminController";

const adminRouter = express.Router();

adminRouter.get("/", AdminController.getCoursesPage);
adminRouter.get("/category", AdminController.getCategoryPage);
adminRouter.get("/course", AdminController.getCoursePage);
adminRouter.get("/detailCourse/:id", AdminController.getDetailCourse);
adminRouter.get("/editCourse/:id", AdminController.getEditCourse);

export default adminRouter;
