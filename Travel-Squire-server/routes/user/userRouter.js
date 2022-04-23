const express = require("express");
const router = express.Router();

const { createUser, getUser } = require("./controller/userController");

module.exports = router;
