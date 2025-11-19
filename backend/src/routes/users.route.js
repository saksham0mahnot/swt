const express = require("express"); //EXPRESS
const router = express.Router();

const {
  registerUser,
  loginUser,
  userDetails,
  updateUser,
} = require("../controllers/users.controller");
const { authenticateJWT } = require("../middlewares/AuthenticateJWT");

// Public Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Protected Routes
router.post("/", authenticateJWT, userDetails);
router.put("/", authenticateJWT, updateUser);

module.exports = router;
