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

  // cam hung comment lai de code
  app.use("/admin", auth.isAdmin, adminRouter);

  // app.use("/admin", adminRouter);
};

export default initWebRouter;
