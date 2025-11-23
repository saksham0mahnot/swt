const { Coupon } = require("../models");

// This is your source of truth for all coupons.
// Add or remove coupons from this list as needed.
const coupons = [
  { code: "BS300SWT", discount: 300.0, is_active: true },
  { code: "NR300SWT", discount: 300.0, is_active: true },
  { code: "DS300SWT", discount: 300.0, is_active: true },
  { code: "SD300SWT", discount: 300.0, is_active: true },
  { code: "NK300SWT", discount: 300.0, is_active: true },
  { code: "MA300SWT", discount: 300.0, is_active: true },
  { code: "KK300SWT", discount: 300.0, is_active: true },
  { code: "VG300SWT", discount: 300.0, is_active: true },
  { code: "IR300SWT", discount: 300.0, is_active: true },
  { code: "AB300SWT", discount: 300.0, is_active: true },
  { code: "CHRIST300", discount: 300.0, is_active: true },

  // To remove a coupon, simply delete its line from this list.
  // For example, if 'NEWYEAR25' is no longer needed, it would be removed.
];

/**
 * Synchronizes the database with the coupons list above.
 * It adds new coupons or updates existing ones, but does NOT delete any.
 * This allows you to manually add coupons in the database.
 */
const syncCoupons = async () => {
  try {
    // Only add or update coupons - don't delete any
    // This allows manual coupons to persist
    await Coupon.bulkCreate(coupons, {
      updateOnDuplicate: ["discount", "is_active", "updated_at"],
    });

    console.log("✅ Coupons synchronized successfully.");
  } catch (error) {
    console.error("❌ Error synchronizing coupons:", error);
    // Re-throw error so the caller knows it failed
    throw error;
  }
};

module.exports = syncCoupons;
