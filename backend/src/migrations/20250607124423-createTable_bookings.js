"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_proof: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploaded_file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      from_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      total_passengers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      adults: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      children: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      elders: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      coupon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "PENDING",
      },
      razorpay_order_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      razorpay_payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referral: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_request: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
