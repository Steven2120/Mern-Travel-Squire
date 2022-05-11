const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  updateUser,
  getUserInfo,
} = require("./controller/userController");

const checkIsUndefinedFunc = require("./helpers/checkIsUndefinedFunc");

const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");

router.post(
  "/register",
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

router.put("/update-user-profile", updateUser);

router.get("/get-user-info", getUserInfo);

module.exports = router;
