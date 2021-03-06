const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function createUser(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "Success", data: savedUser });
  } catch (e) {
    console.log("1");
    next(e);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          { expiresIn: "24h" }
        );
        res.json({ message: "Success", payload: jwtToken });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateUser(req, res, next) {
  if (req.body.password) {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
  }

  try {
    let updatedUser = await User.findOneAndUpdate(
      {
        email: res.locals.decodedJwt.email,
      },
      req.body,
      { new: true }
    );

    if (req.body.password) {
      res.status(202).json({ message: "Success", payload: updatedUser });
    } else {
      res.json({ message: "Success", payload: updatedUser });
    }
  } catch (e) {
    next(e);
  }
}

async function getUserInfo(req, res, next) {
  try {
    let userInfo = await User.findOne({
      email: res.locals.decodedJwt.email,
    }).select("-password -__v -_id");

    res.json({ message: "Success", payload: userInfo });
  } catch (e) {
    next(e);
  }
}

module.exports = { createUser, login, updateUser, getUserInfo };
