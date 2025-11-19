// id, userId, AgentId (PARTNER ? AgentId : null), From-location, To-location,, start-date, end-date, total-passengers (Adult,Children, Elders), pet, amount, discount, coupons/refreral, customer request
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    static associate(models) {}
  }

  bookings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_proof: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploaded_file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      agent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      from_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adults: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      children: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      elders: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      coupon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING",
      },
      razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_request: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "bookings",
      modelName: "bookings",
      timestamps: true,
      underscored: true,
    }
  );

  return bookings;
};
