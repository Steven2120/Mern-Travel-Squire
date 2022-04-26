const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  updateUser,
  getUserInfo,
} = require("./controller/userController");

const jwtMiddleware = require("../utils/jwtMiddleware");

const checkIsUndefinedFunc = require("./helpers/checkIsUndefinedFunc");

const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");
const app = require("../../app");

router.post(
  "/sign-up",
  checkIsUndefinedFunc,
  checkIsStrongPasswordFunc,
  checkIsAlphanumericFunc,
  checkIsAlphaFunc,
  checkIsEmailFunc,
  checkIsEmptyFunc,
  createUser
);

router.post(
  "/login",
  checkIsUndefinedFunc,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

router.put("/update-user-profile", jwtMiddleware, updateUser);

router.get("/get-user-info", jwtMiddleware, getUserInfo);

module.exports = router;
