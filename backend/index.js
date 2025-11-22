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
      const app = require('./src/app');
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