import apiRouter from "./api";
import adminRouter from "./admin";

const initWebRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api", apiRouter);
  app.use("/admin", adminRouter);
};

export default initWebRouter;
