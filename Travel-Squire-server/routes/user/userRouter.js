const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  updateUser,
  getUserInfo,
} = require("./controller/userController");

module.exports = router;
