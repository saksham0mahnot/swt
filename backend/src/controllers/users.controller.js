const db = require("../models");
const Users = db.Users; // Sequelize model for users table
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @route   POST /api/web/auth/register
 * @desc    Register a new user
 * @access  Public
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, phone_number, email, password, confirmPassword, role } =
      req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in DB
    const user = await Users.create({
      name,
      phone_number: phone_number || null,
      email,
      password: hashedPassword,
      role: role || "USER", // default role
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Exclude password from response
    const { password: _, ...safeUser } = user.toJSON();

    return res.status(201).json({
      status: true,
      message: "User Registered Successfully.",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    // Handle specific database errors
    if (
      error.name === "SequelizeConnectionError" ||
      error.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(500).json({
        status: false,
        message: "Database connection error. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        status: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    return res.status(500).json({
      status: false,
      message: "An error occurred during registration. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   POST /api/web/auth/login
 * @desc    Login user and return token
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and Password are required",
      });
    }

    // Check user existence
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    const { password: _, ...safeUser } = user.toJSON();

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error during login",
    });
  }
};

/**
 * @route   GET /api/web/auth/me
 * @desc    Get logged-in user details
 * @access  Protected (Requires authenticateJWT middleware)
 */
exports.userDetails = async (req, res) => {
  try {
    const user = req.user; // Set by authenticateJWT middleware

    if (!user || !user.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized or user not found",
      });
    }

    // Fetch fresh user data from DB
    const userDetails = await Users.findOne({ where: { id: user.id } });

    if (!userDetails) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User details fetched successfully.",
      data: userDetails,
    });
  } catch (error) {
    console.error("User details error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error while fetching user details",
    });
  }
};

/**
 * @route   PUT /api/web/user/
 * @desc    Update user profile
 * @access  Protected (Requires authenticateJWT middleware)
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone_number } = req.body;
    const userId = req.user.id; // Get user ID from JWT

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        status: false,
        message: "Name and email are required",
      });
    }

    // Update user
    const updatedUser = await Users.update(
      {
        name,
        email,
        phone_number: phone_number || null,
      },
      { where: { id: userId } }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Get updated user data
    const user = await Users.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to update profile",
    });
  }
};
