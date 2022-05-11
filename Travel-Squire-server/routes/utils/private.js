const jwt = require("jsonwebtoken");
const User = require("../user/model/User");
const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

exports.private = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorMessageHandlerClass("Not authorized to access this route", 401)
    );
  }
};
