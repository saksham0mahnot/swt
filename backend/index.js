const serverless = require('serverless-http');
const app = require('./src/app');
const db = require('./src/models');

// Ensure DB is synced on cold start
let isSynced = false;
const syncDb = async () => {
  if (!isSynced) {
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync({ alter: true });
      isSynced = true;
      console.log("✅ Vercel: Database connected and synced");
    } catch (error) {
      console.error("❌ Vercel: Database connection failed:", error);
    }
  }
};

const handler = serverless(app);

module.exports = async (req, res) => {
  await syncDb();
  return handler(req, res);
};
