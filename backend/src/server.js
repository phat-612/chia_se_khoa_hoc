import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

// import tự viết
import initWebRouter from "./routes";
import viewEngine from "./configs/viewEngine";

const port = process.env.PORT || 8080;
const app = express();

// cấu hình cors
app.use(cors());
// cấu hình body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cấu hình view engine
viewEngine(app);
// cấu hình router
initWebRouter(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
