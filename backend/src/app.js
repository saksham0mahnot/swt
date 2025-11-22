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
