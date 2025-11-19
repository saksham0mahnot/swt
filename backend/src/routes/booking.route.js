// src/routes/booking.route.js
const express = require("express");
const {
  createBooking,
  validateCoupon,
  getBookingsByEmail,
  confirmBooking,
} = require("../controllers/booking.controller.js");

const router = express.Router();

router.post("/createBooking", createBooking);
router.post("/validateCoupon", validateCoupon);
router.get("/my", getBookingsByEmail);
router.post("/confirm/:bookingId", confirmBooking);

module.exports = router;
