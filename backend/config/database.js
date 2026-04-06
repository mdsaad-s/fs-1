const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',  // 🔴 APNA PASSWORD DALO
    database: 'fairshare_db',
    waitForConnections: true,
    connectionLimit: 10
});

const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log('✅ Database connected!');
        conn.release();
        return true;
    } catch (err) {
        console.log('❌ Database connection failed:', err.message);
        return false;
    }
};

module.exports = { pool, testConnection };