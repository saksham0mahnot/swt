// Test connection speed to Railway
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnectionSpeed() {
  console.log('⏱️  Testing connection speed to Railway...\n');

  const startTime = Date.now();
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000
    });

    const connectTime = Date.now() - startTime;
    console.log(`✅ Connected in ${connectTime}ms`);

    // Test query speed
    const queryStart = Date.now();
    await connection.execute('SELECT 1');
    const queryTime = Date.now() - queryStart;
    console.log(`✅ Query executed in ${queryTime}ms`);

    await connection.end();

    const totalTime = Date.now() - startTime;
    console.log(`\n📊 Total time: ${totalTime}ms`);
    
    if (connectTime > 3000) {
      console.log('\n⚠️  WARNING: Connection time > 3 seconds!');
      console.log('This will cause 504 timeouts on Vercel serverless functions.');
      console.log('\nRecommendations:');
      console.log('1. Use Vercel Postgres instead');
      console.log('2. Deploy backend on Railway (use internal network)');
      console.log('3. Use a database closer to Vercel servers');
    } else {
      console.log('\n✅ Connection speed is acceptable for Vercel');
    }

  } catch (error) {
    const failTime = Date.now() - startTime;
    console.error(`\n❌ Connection failed after ${failTime}ms`);
    console.error('Error:', error.message);
  }
}

testConnectionSpeed();
