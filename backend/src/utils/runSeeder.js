const path = require("path");
const dotenv = require("dotenv");

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const db = require("../models");
const seedCoupons = require("./couponSeeder");

const run = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await db.sequelize.authenticate();
    console.log("✅ Connected to Database");

    console.log("🌱 Running seeder...");
    await seedCoupons();
    
    console.log("✨ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

run();
