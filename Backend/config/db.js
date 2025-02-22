const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection and add logging
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to the database: ${process.env.DB_NAME} at ${process.env.DB_HOST}`);
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.message);
    process.exit(1); // Exit the process if unable to connect
  }
})();

// Debugging for SQL queries (optional, enable only in development)
if (process.env.NODE_ENV === "development") {
  pool.on("connection", (connection) => {
    console.log(`🔌 New connection established with ID: ${connection.threadId}`);
  });

  pool.on("enqueue", () => {
    console.warn("⚠️ Waiting for available database connection...");
  });

  pool.on("release", (connection) => {
    console.log(`🔓 Connection released with ID: ${connection.threadId}`);
  });
}

module.exports = { pool };
