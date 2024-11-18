import path from "path";
const viewEngine = (app) => {
  app.set("view engine", "ejs");
  // Set the directory for the views
  app.set("views", path.join(__dirname, "../views"));
};
export default viewEngine;
