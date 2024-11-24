const globalVariable = (req, res, next) => {
  if (req.session.user) {
    res.locals.loginUser = req.session.user;
  }
  next();
};

export default globalVariable;
