"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const mysql2 = require('mysql2'); // Explicit require for Vercel bundling

// CRITICAL: Cache the database instance across serverless function invocations
// This prevents re-initializing Sequelize on every request
let cachedDb = null;

function initializeDatabase() {
  // Return cached instance if available
  if (cachedDb) {
    console.log('♻️  Using cached database instance');
    return cachedDb;
  }

  console.log('🔄 Initializing new database instance...');
  const db = {};

  // Force Sequelize to use the bundled mysql2 module
  config.dialectModule = mysql2;

  // Add retry logic for serverless cold starts
  config.retry = {
    max: 3,
    timeout: 3000,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNREFUSED/,
      /ENOTFOUND/,
    ],
  };

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  // Load all models
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  // Set up associations
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // Cache the instance
  cachedDb = db;
  console.log('✅ Database instance initialized and cached');

  return db;
}

// Export the initialized database
module.exports = initializeDatabase();
