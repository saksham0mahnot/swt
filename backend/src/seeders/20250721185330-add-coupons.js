// src/seeders/YYYYMMDDHHMMSS-add-coupons.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "coupons",
      [
        {
          code: "BS300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "NR300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "DS300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "SD300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "NK300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "MA300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "KK300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "VG300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "IR300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "AB300SWT",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "CHRIST300",
          discount: 300.0,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coupons", null, {});
  },
};
