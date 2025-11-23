// Test database connection
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('🔍 Testing Railway Database Connection...\n');
  
  console.log('Environment Variables:');
  console.log('DB_HOST:', process.env.DB_HOST || 'NOT SET');
  console.log('DB_PORT:', process.env.DB_PORT || 'NOT SET');
  console.log('DB_USER:', process.env.DB_USER || 'NOT SET');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');
  console.log('DB_NAME:', process.env.DB_NAME || 'NOT SET');
  console.log('\n---\n');

  try {
    console.log('Attempting to connect...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000
    });

    console.log('✅ Connection successful!\n');

    // Test query
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('✅ Query test successful:', rows);

    // Show tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📊 Tables in database:');
    tables.forEach(table => {
      console.log('  -', Object.values(table)[0]);
    });

    await connection.end();
    console.log('\n✅ All tests passed!');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    process.exit(1);
  }
}

testConnection();
