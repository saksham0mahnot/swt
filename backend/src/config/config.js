// src/config/config.js
require("dotenv").config(); // load .env variables

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log,
    seederStorage: "sequelize",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Disable logging in production for performance
    dialectOptions: {
      connectTimeout: 3000, // 3 seconds - fail fast
      // Enable connection reuse
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    },
    pool: {
      max: 2, // Reduced for serverless
      min: 0, // No minimum connections
      acquire: 3000, // 3 seconds - fail fast on Vercel
      idle: 1000, // Release idle connections quickly
      evict: 1000, // Check for idle connections every second
    },
  },
};
