const { Coupon } = require("../models");
const { Op } = require("sequelize");

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
 * It deletes any coupons that are not in the list and adds any new ones.
 */
const syncCoupons = async () => {
  try {
    const couponCodesInList = coupons.map((c) => c.code);

    // 1. Delete coupons that are in the DB but not in our list
    await Coupon.destroy({
      where: {
        code: {
          [Op.notIn]: couponCodesInList,
        },
      },
    });

    // 2. Add or update coupons from our list
    for (const coupon of coupons) {
      // This will find a coupon with the given code, or create it if it doesn't exist.
      const [dbCoupon, created] = await Coupon.findOrCreate({
        where: { code: coupon.code },
        defaults: coupon,
      });

      // If the coupon already existed, you might want to update it
      if (!created) {
        await dbCoupon.update(coupon);
      }
    }

    console.log("✅ Coupons synchronized successfully.");
  } catch (error) {
    console.error("❌ Error synchronizing coupons:", error);
  }
};

module.exports = syncCoupons;
