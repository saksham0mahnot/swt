// src/controllers/booking.controller.js
const db = require("../models");
const { Sequelize } = require("sequelize");
const Bookings = db.bookings;
const Coupon = db.Coupon; // Import the Coupon model

const createBooking = async (req, res, next) => {
  try {
    const {
      user_id,
      full_name,
      email,
      contact_number,
      gender,
      age,
      id_proof,
      uploaded_file,
      agent_id,
      from_location,
      to_location,
      start_date,
      end_date,
      total_passengers,
      adults,
      children,
      elders,
      pet,
      amount,
      coupon, // The coupon code from the request
      referral,
      customer_request,
    } = req.body;

    if (
      !full_name ||
      !email ||
      !gender ||
      !age ||
      !contact_number ||
      !id_proof ||
      !total_passengers
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    let discount = 0;
    let finalAmount = amount;

    if (coupon) {
      const couponData = await Coupon.findOne({
        where: { code: coupon, is_active: true },
      });

      if (couponData) {
        discount = couponData.discount;
        finalAmount -= discount;
      } else {
        const error = new Error("Invalid or inactive coupon code");
        error.statusCode = 400;
        throw error;
      }
    }

    const newBooking = await Bookings.create({
      user_id,
      full_name,
      email,
      contact_number,
      gender,
      age,
      id_proof,
      uploaded_file,
      agent_id,
      from_location,
      to_location,
      start_date,
      end_date,
      total_passengers,
      adults,
      children,
      elders,
      pet,
      amount, // Use the final amount after discount
      discount,
      coupon,
      referral,
      customer_request,
      status: 'pending' // Set initial status to pending
    });

    if (!newBooking) {
      const error = new Error("Booking creation failed");
      error.statusCode = 500;
      throw error;
    }

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: newBooking.id,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    next(error);
  }
};

const validateCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.body;

    if (
      !couponCode ||
      typeof couponCode !== "string" ||
      couponCode.trim() === ""
    ) {
      return res.status(400).json({
        isValid: false,
        message: "Please provide a valid coupon code",
      });
    }

    const coupon = await Coupon.findOne({
      where: {
        code: Sequelize.where(
          Sequelize.fn("UPPER", Sequelize.col("code")),
          "=",
          couponCode.trim().toUpperCase()
        ),
        is_active: true,
      },
    });

    if (coupon) {
      res.status(200).json({
        isValid: true,
        discount: coupon.discount,
      });
    } else {
      res.status(400).json({
        isValid: false,
        message: "Invalid or inactive coupon",
      });
    }
  } catch (error) {
    console.error("Coupon validation error:", error);
    res.status(500).json({
      isValid: false,
      message: "Error validating coupon. Please try again.",
    });
  }
};

const getBookingsByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    const bookings = await Bookings.findAll({
      where: {
        email: email
      },
      order: [['created_at', 'DESC']],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      raw: true
    });

    // Add traveler details to each booking
    const bookingsWithTravelers = bookings.map(booking => {
      const travelers = Array.from({ length: booking.total_passengers }, (_, index) => ({
        name: booking.full_name,
        age: booking.age,
        gender: booking.gender,
        relationship: index === 0 ? 'Primary' : 'Companion'
      }));

      return {
        ...booking,
        travelers
      };
    });

    res.json(bookingsWithTravelers);
  } catch (error) {
    next(error);
  }
};

const confirmBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    
    // Find the booking by ID
    const booking = await Bookings.findByPk(bookingId);
    
    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    // Update booking status to confirmed
    booking.status = 'confirmed';
    await booking.save();

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking: booking
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  validateCoupon,
  getBookingsByEmail,
  confirmBooking
};
