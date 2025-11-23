const serverless = require('serverless-http');

let handler;
let appLoadError = null;

// Pre-warm the app on cold start (but don't block the function)
const warmupPromise = (async () => {
  try {
    const app = require('./src/app');
    handler = serverless(app);
    console.log('✅ App warmed up successfully');
  } catch (error) {
    console.error('❌ App warmup failed:', error);
    appLoadError = error;
  }
})();

module.exports = async (req, res) => {
  console.log("🚀 Vercel Function Invoked: " + req.url);
  
  // IMMEDIATE HEALTH CHECK - Bypass app loading
  if (req.url.includes('/api/health')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "ok",
      message: "Backend is reachable",
      env: process.env.VERCEL ? "Vercel" : "Local"
    }));
    return;
  }

  try {
    // Wait for warmup to complete (with timeout)
    if (!handler && !appLoadError) {
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('App warmup timeout')), 8000)
      );
      await Promise.race([warmupPromise, timeout]);
    }

    if (appLoadError) {
      throw appLoadError;
    }

    if (!handler) {
      const app = require('./src/app');
      handler = serverless(app);
    }

    return await handler(req, res);
  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "error",
      message: "Backend failed",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }));
  }
};