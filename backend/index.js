const serverless = require('serverless-http');

let handler;

module.exports = async (req, res) => {
  // IMMEDIATE HEALTH CHECK - Bypass app loading to verify Vercel function is alive
  if (req.url.includes('/api/health')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "ok",
      message: "Backend is reachable (Standalone)",
      env: process.env.VERCEL ? "Vercel" : "Local"
    }));
    return;
  }

  try {
    if (!handler) {
      console.log("🚀 Starting Cold Boot...");
      // Lazy load dependencies
      const app = require('./src/app');
      const db = require('./src/models');

      // Attempt DB connection (Skip for health check to avoid timeouts)
      // Note: Since we handle /api/health above, this logic only runs for other routes
      try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: true });
        console.log("✅ Vercel: Database connected and synced");
      } catch (dbError) {
        console.error("❌ Vercel: Database connection failed:", dbError);
      }

      handler = serverless(app);
    }

    return await handler(req, res);
  } catch (error) {
    console.error("CRITICAL STARTUP ERROR:", error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "error",
      message: "Backend failed to start",
      details: error.message,
      stack: error.stack
    }));
  }
};