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
    return next();
  }
  if (req.path === "/login") {
    return next();
  }
  return res.redirect("/admin/login");
};
const isAdmin = (req, res, next) => {
  isLogin(req, res, () => {
    if (req.path === "/login" || req.session.user.role === "admin") {
      return next();
    }
    return res.redirect("/admin/login");
  });
};
const isUser = (req, res, next) => {
  isLogin(req, res, () => {
    if (req.session.user.role === "user") {
      next();
    } else {
      return res.redirect("/login");
    }
  });
};
export default { authToken, isLogin, isAdmin, isUser };
