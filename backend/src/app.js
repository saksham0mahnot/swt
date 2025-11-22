const express = require("express"); //EXPRESS
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Import the new coupon seeder
const seedCoupons = require("./utils/couponSeeder");
const userWebRoutes = require("./routes/users.route");
const bookingsRouter = require("./routes/booking.route.js");
const uploadRouter = require("./routes/upload.route.js");
const paymentRouter = require("./routes/payment.route.js");

dotenv.config();

const app = express();

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

// Database Connection Test Endpoint
app.get("/api/db-test", async (req, res) => {
  const db = require("./models");
  try {
    console.log("🔍 Testing database connection...");
    console.log("Environment:", process.env.NODE_ENV || "development");
    console.log("DB Host:", process.env.DB_HOST || "NOT SET");
    console.log("DB Name:", process.env.DB_NAME || "NOT SET");
    console.log("DB User:", process.env.DB_USER || "NOT SET");
    console.log("DB Password:", process.env.DB_PASSWORD ? "SET" : "NOT SET");
    
    // Test connection with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Connection timeout after 8 seconds")), 8000)
    );
    
    await Promise.race([
      db.sequelize.authenticate(),
      timeoutPromise
    ]);
    
    console.log("✅ Database connection successful");
    res.status(200).json({ 
      status: "ok", 
      message: "Database connection successful",
      env: process.env.NODE_ENV || "development",
      host: process.env.DB_HOST || "NOT SET"
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    res.status(500).json({ 
      status: "error", 
      message: error.message,
      env: process.env.NODE_ENV || "development",
      host: process.env.DB_HOST || "NOT SET",
      dbName: process.env.DB_NAME || "NOT SET",
      dbUser: process.env.DB_USER || "NOT SET",
      dbPasswordSet: process.env.DB_PASSWORD ? "YES" : "NO"
    });
  }
});

const db = require("./models"); // Import db for syncing

// Manual Seeder Endpoint (For Vercel)
// This endpoint syncs ONLY the Coupon table and seeds data.
// For other tables (Users, Bookings), use migrations or the /api/init-db endpoint.
app.get("/api/seed-coupons", async (req, res) => {
  try {
    console.log("🔄 Syncing Coupon table...");
    // Only sync Coupon model to avoid timeout
    await db.Coupon.sync(); // Creates table if it doesn't exist (fast)
    console.log("✅ Coupon table ready");

    console.log("🌱 Seeding Coupons...");
    await seedCoupons();
    console.log("✅ Coupons Seeded");

    res.status(200).json({ 
      status: "ok", 
      message: "Coupon table synced and coupons seeded successfully" 
    });
  } catch (error) {
    console.error("Manual seeding/sync failed:", error);
    res.status(500).json({ status: "error", message: error.message, stack: error.stack });
  }
});

// Database Migration Runner (Use this ONCE after deployment to create all tables)
app.get("/api/run-migrations", async (req, res) => {
  try {
    console.log("🔄 Running database migrations...");
    const queryInterface = db.sequelize.getQueryInterface();
    
    // Import migrations
    const usersMigration = require("./migrations/20250607124422-createTable_users");
    const bookingsMigration = require("./migrations/20250607124423-createTable_bookings");
    const couponsMigration = require("./migrations/20250607124424-create-coupons");
    
    // Run migrations in order
    await usersMigration.up(queryInterface, db.Sequelize);
    console.log("✅ Users table created");
    
    await bookingsMigration.up(queryInterface, db.Sequelize);
    console.log("✅ Bookings table created");
    
    await couponsMigration.up(queryInterface, db.Sequelize);
    console.log("✅ Coupons table created");

    res.status(200).json({ 
      status: "ok", 
      message: "All migrations completed. Database is ready! Now visit /api/seed-coupons to seed coupon data." 
    });
  } catch (error) {
    console.error("Migration failed:", error);
    res.status(500).json({ 
      status: "error", 
      message: error.message, 
      stack: error.stack,
      hint: "If tables already exist, this is expected. You can ignore this error."
    });
  }
});

// Immediately-invoked async function to seed coupons on startup (Skip in Vercel)
if (process.env.VERCEL !== "1") {
  (async () => {
    try {
      await seedCoupons();
    } catch (error) {
      console.error("Seeding failed (non-fatal):", error.message);
    }
  })();
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend URL
    credentials: true, // allow cookies/headers
  })
);

// Middleware
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Route configuration
app.use("/api/web/user", userWebRoutes);
app.use("/api/web/", bookingsRouter);
app.use("/api/web/", uploadRouter);
app.use("/api/web/", paymentRouter);

// Serve frontend static files
// Serve frontend static files ONLY if not in Vercel (Vercel handles this via vercel.json)
if (process.env.VERCEL !== "1") {
  const frontendDistPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDistPath));

  // SPA fallback for non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
