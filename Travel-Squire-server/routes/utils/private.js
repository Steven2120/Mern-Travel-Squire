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

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_JWT_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        ErrorMessageHandlerClass("No user was found with that id", 404)
      );
    }

    req.user = user;

    next();
  } catch (err) {
    next(
      new ErrorMessageHandlerClass("Not authorized to access this route", 401)
    );
  }
};
