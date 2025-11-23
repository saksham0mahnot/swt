// Minimal test - just try to connect, no Sequelize overhead
const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  const startTime = Date.now();
  
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Attempting direct MySQL connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 5000
    });

    const connectTime = Date.now() - startTime;
    
    const [rows] = await connection.execute('SELECT 1 as test');
    await connection.end();
    
    const totalTime = Date.now() - startTime;
    
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'success',
      message: 'Direct MySQL connection works!',
      timing: {
        connect: `${connectTime}ms`,
        total: `${totalTime}ms`
      },
      result: rows[0]
    }));
    
  } catch (error) {
    const totalTime = Date.now() - startTime;
    
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 'error',
      message: error.message,
      code: error.code,
      errno: error.errno,
      timing: `${totalTime}ms`,
      env: {
        host: process.env.DB_HOST || 'NOT SET',
        port: process.env.DB_PORT || 'NOT SET',
        user: process.env.DB_USER || 'NOT SET',
        passwordSet: !!process.env.DB_PASSWORD
      }
    }));
  }
};
