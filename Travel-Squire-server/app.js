const express = require("express");

//HTTP request logger middleware for nodejs
const logger = require("morgan");

const cors = require("cors");

//creates a new express instance
const app = express();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(cors());

//if app is in dev, app.use is use to bind the middleware to the application
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//required for Post and Put requests since you are sending data in the form of a data object, to the server and you are asking the server to accept or store data which is enclosed it the req.body
app.use(express.json());

//this is a inbuilt method in express to recognize the incoming request object as a Json Object
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
