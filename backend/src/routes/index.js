import apiRouter from "./api";
import adminRouter from "./admin";
import globalVariable from "../middlewares/globalVariable";
import auth from "../middlewares/auth";

const initWebRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use(globalVariable);

  app.use("/api", apiRouter);
  app.use("/admin", auth.isAdmin, adminRouter);
};

export default initWebRouter;
