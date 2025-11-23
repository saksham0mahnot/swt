// Fast coupon validation - bypasses Sequelize for speed
const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  // Only accept POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    // Parse body
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const { couponCode } = JSON.parse(body);

    if (!couponCode || typeof couponCode !== 'string' || couponCode.trim() === '') {
      res.statusCode = 400;
      return res.end(JSON.stringify({
        isValid: false,
        message: 'Please provide a valid coupon code'
      }));
    }

    // Direct MySQL connection (fast!)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 3000
    });

    // Query coupon
    const [rows] = await connection.execute(
      'SELECT discount FROM coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1 LIMIT 1',
      [couponCode.trim()]
    );

    await connection.end();

    if (rows.length > 0) {
      res.statusCode = 200;
      res.end(JSON.stringify({
        isValid: true,
        discount: parseFloat(rows[0].discount)
      }));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({
        isValid: false,
        message: 'Invalid or inactive coupon'
      }));
    }

  } catch (error) {
    console.error('Coupon validation error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({
      isValid: false,
      message: 'Error validating coupon. Please try again.'
    }));
  }
};
