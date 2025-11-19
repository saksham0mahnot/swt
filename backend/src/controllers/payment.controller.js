// src/controllers/payment.controller.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../models");
const Bookings = db.Bookings;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @route   POST /api/web/payment/create-order
 * @desc    Create a new payment order
 * @access  Public
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({
        status: false,
        message: "Amount and receipt are required",
      });
    }

    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({
        status: false,
        message: "Error creating order",
      });
    }

    res.status(200).json({
      status: true,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/web/payment/verify-payment
 * @desc    Verify the payment signature
 * @access  Public
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingIds,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingIds
    ) {
      return res.status(400).json({
        status: false,
        message: "All payment verification fields are required",
      });
    }

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({
        status: false,
        message: "Payment verification failed. Signature mismatch.",
      });
    }

    // If payment is verified, create the booking
    const newBooking = await Bookings.update(
      {
        ...bookingIds,
        payment_status: "PAID",
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      },
      {
        where: {
          id: bookingIds,
        },
      }
    );

    res.status(201).json({
      status: true,
      message: "Payment verified successfully and booking created!",
      bookingId: bookingIds,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
