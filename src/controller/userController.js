const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const moviesUser = require("../models/moviesUser");

// signup
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, picture } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
      status: "PASSEED",
      message: "User signup success",
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

// login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
      status: "PASSED",
      message: "User Login success",
    });
  } else {
    res.status(400);
    throw new Error("Inavalid Email or Password");
  }
});

// movies user details of payement
const movieUserDetails = asyncHandler(async (req, res) => {
  try {
    const { name, email, dateOfBirth, city } = req.body;
    const result = await moviesUser.create({
      name,
      email,
      dateOfBirth,
      city,
    });
    if (result) {
      res.json({
        name: name,
        email: email,
        dateOfBirth,
        city: city,
        status: "PASSED",
        message: "User movies details filled.",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(400).json({ message: error + "occured" });
  }
});

module.exports = { registerUser, authUser, movieUserDetails };
