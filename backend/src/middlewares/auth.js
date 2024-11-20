import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token not found" });
  }
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = user;
      next();
    });
  }
};

const isLogin = (req, res, next) => {
  if (req.session.isLogin) {
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
const isAdmin = (req, res, next) => {
  isLogin(req, res, () => {
    if (req.session.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  });
};
const isUser = (req, res, next) => {
  isLogin(req, res, () => {
    if (req.session.user.role === "user") {
      next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  });
};
export default { authToken, isLogin, isAdmin, isUser };
