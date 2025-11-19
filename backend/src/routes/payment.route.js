// src/routes/payment.route.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller.js");

// Public Routes
router.post("/payment/createOrder", createOrder);
router.post("/payment/verifyPayment", verifyPayment);

module.exports = router;
