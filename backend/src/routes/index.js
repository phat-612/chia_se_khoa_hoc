import apiRouter from "./api";
import adminRouter from "./admin";
import globalVariable from "../middlewares/globalVariable";
import auth from "../middlewares/auth";

const initWebRouter = (app) => {
  app.use(globalVariable);

  app.use("/api", apiRouter);

  app.use("/admin", auth.isAdmin, adminRouter);
  app.use((req, res) => {
    res.render("404");
  });
};

export default initWebRouter;
