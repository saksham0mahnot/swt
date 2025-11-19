const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const db = require("./src/models");
const couponSeeder = require("./src/seeders/20250721185330-add-coupons");

// Initialize database and start server
const PORT = process.env.PORT || 7400;

const runSeeders = async () => {
  try {
    console.log("🌱 Running coupons seeder...");
    await couponSeeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
    console.log("✅ Coupons seeded successfully");
  } catch (error) {
    // If seeder fails (likely because coupons already exist due to unique constraint), just log and continue
    console.log("ℹ️ Coupons seeder skipped (likely already exists)");
  }
};

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Connected to Database");

    await db.sequelize.sync({ alter: true });
    console.log("📊 Database synchronized successfully");

    // Run coupons seeder after database sync
    await runSeeders();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
