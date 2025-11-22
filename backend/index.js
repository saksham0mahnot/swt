const serverless = require('serverless-http');

let handler;

module.exports = async (req, res) => {
  try {
    if (!handler) {
      // Lazy load dependencies to catch top-level errors
      const app = require('./src/app');
      const db = require('./src/models');

      // Attempt DB connection (Skip for health check to avoid timeouts)
      if (!req.url.includes('/api/health')) {
        try {
          await db.sequelize.authenticate();
          await db.sequelize.sync({ alter: true });
          console.log("✅ Vercel: Database connected and synced");
        } catch (dbError) {
          console.error("❌ Vercel: Database connection failed:", dbError);
        }
      } else {
         console.log("ℹ️ Vercel: Skipping DB sync for health check");
      }

      handler = serverless(app);
    }

    return await handler(req, res);
  } catch (error) {
    console.error("CRITICAL STARTUP ERROR:", error);
    res.status(500).json({
      status: "error",
      message: "Backend failed to start",
      details: error.message,
      stack: error.stack
    });
  }
};
