const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

console.log('Database Config:', {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000,
    timezone: '+00:00',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
});

module.exports = sequelize;
