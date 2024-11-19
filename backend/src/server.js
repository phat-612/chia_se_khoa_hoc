import express from "express";
import dotenv from "dotenv/config";
import redisStore from "connect-redis";
import { createClient } from "redis";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

// import tự viết
import initWebRouter from "./routes";
import viewEngine from "./configs/viewEngine";

const port = process.env.PORT || 8080;
const app = express();

// cấu hình session
const redisClient = createClient({
  password: process.env.PASSWORD_REDIS,
  socket: {
    host: process.env.HOST_REDIS,
    port: process.env.PORT_REDIS,
  },
});
redisClient.connect().catch(console.error);
const redisStoreInstance = new redisStore({
  client: redisClient,
  prefix: "",
});
app.use(
  session({
    store: redisStoreInstance,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
