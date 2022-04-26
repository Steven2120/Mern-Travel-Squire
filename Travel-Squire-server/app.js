const express = require("express");
//HTTP request logger middleware for nodejs
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
//creates a new express instance
const app = express();
const userRouter = require("./routes/user/userRouter");
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
app.use(cors());

//if app is in dev, app.use is use to bind the middleware to the application
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000,
  message:
    "Too many requests from this IP, please try again or contact support",
});

app.use("/api", limiter);

//required for Post and Put requests since you are sending data in the form of a data object, to the server and you are asking the server to accept or store data which is enclosed it the req.body
app.use(express.json());

//this is a inbuilt method in express to recognize the incoming request object as a Json Object
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.all("*", function (req, res, next) {
  next(
    ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
