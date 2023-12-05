const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  movieUserDetails,
} = require("./../controller/userController");

// register
router.route("/").post(registerUser);
// login
router.route("/login").post(authUser);
// user details of cinema watch
router.route("/movieuser").post(movieUserDetails);

module.exports = router;
