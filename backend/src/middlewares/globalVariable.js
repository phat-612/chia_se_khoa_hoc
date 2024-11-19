const globalVariable = (req, res, next) => {
  //   console.log(res.locals);
  //   if (!res.locals.error) {
  //     res.locals.error = "";
  //   }
  next();
};

export default globalVariable;
