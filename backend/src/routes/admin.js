import express from "express";

import AdminController from "../controllers/AdminController";

const adminRouter = express.Router();

// CATEGORY
adminRouter.get("/category", AdminController.getCategoryPage);

// COURSES
adminRouter.get("/course", AdminController.getCoursePage);
adminRouter.get("/detailCourse/:id", AdminController.getDetailCourse);
adminRouter.get("/editCourse/:id", AdminController.getEditCourse);
adminRouter.get("/addCourse", AdminController.getAddCourse);

// USER
adminRouter.get("/user", AdminController.getUserPage);
// login
adminRouter.get("/login", AdminController.getLoginPage);

export default adminRouter;
